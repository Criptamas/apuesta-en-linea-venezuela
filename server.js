import express from 'express';
import path from 'path';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();

// 1️⃣ Sirve los archivos estáticos de React
const buildPath = path.resolve('dist');
app.use(express.static(buildPath));

// 2️⃣ Ruta de tu scraper
app.get('/api/animalitos-hourly', async (req, res) => {
  try {
    const { data } = await axios.get(
      'https://guacharoactivo.com.ve/resultados',
      { timeout: 8000, headers: { 'User-Agent': 'Mozilla/5.0' } }
    );
    const $ = cheerio.load(data);
    const resultados = [];
    $('section.min-h-[100vh] .grid > div').each((i, el) => {
      const img    = $(el).find('img').attr('src');
      const hora   = $(el).find('p.text-yellow-500').text().trim();
      const numero = $(el).find('span').first().text().trim();
      const animal = $(el).find('span').last().text().trim();
      resultados.push({ img, hora, numero, animal });
    });
    return res.json(resultados);
  } catch (err) {
    console.error('Scrape error:', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// 3️⃣ Cualquier otra ruta, devuelve index.html (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});