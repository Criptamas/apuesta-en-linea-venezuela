import axios from "axios";
import * as cheerio from "cheerio";

exports.handler = async function () {
  try {
    const { data } = await axios.get(
      "https://www.lottoresultados.com/resultados/animalitos#resultado-de-guacharo-activo-de-hoy",
      { timeout: 10000 }
    );
    const $ = cheerio.load(data);

    const section = $("#resultado-de-guacharo-activo-de-hoy");
    if (!section.length) {
      return { statusCode: 500, body: JSON.stringify({ error: "Sección no hallada" }) };
    }

    const resultados = [];
    section
      .find(".row .col-xs-6.col-sm-3")
      .each((_, el) => {
        const hora = $(el).find("span.hora, .hora span").text().trim();
        const texto = $(el).find("span.numero-animal, .numero-animal").text().trim();
        const [numero, animal] = texto.split("-").map(s => s.trim());
        let img = $(el).find("img").attr("src") || "";
        if (img.startsWith("//")) img = "https:" + img;
        if (img.startsWith("/")) img = "https://www.lottoresultados.com" + img;
        resultados.push({ numero, animal, hora, img });
      });

    // filtrado 8–19 y slice 12
    const parseHour = h => {
      let hh = Number(h.split(":")[0]);
      if (hh < 8) hh += 12;
      return hh;
    };
    const filtrados = resultados
      .filter(r => {
        const hh = parseHour(r.hora);
        return hh >= 8 && hh <= 19;
      })
      .slice(0, 12);

    return { statusCode: 200, body: JSON.stringify(filtrados) };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
