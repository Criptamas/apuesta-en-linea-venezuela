import express from 'express'
import cors from 'cors'
import puppeteer from 'puppeteer'
import cron   from 'node-cron'



const app  = express()
app.use(cors())

let cacheResultados = []

// ---------------------  Scraper  ---------------------
async function scrapeConPuppeteer () {
  const BASE = 'https://www.lottoresultados.com'
  console.log('🌐 [scrape] Iniciando Puppeteer…')

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page    = await browser.newPage()

  await page.goto(`${BASE}/resultados/animalitos`, { waitUntil: 'networkidle2' })

  /*───────────────────────────────────────────────────
    1️⃣  Localiza la sección “Guacharo Activo”
        – primero la de AYER; si no existe, la de HOY
  ───────────────────────────────────────────────────*/
  let anchor = await page.$('#resultado-de-guacharo-activo-de-ayer')
  if (!anchor) anchor = await page.$('#resultado-de-guacharo-activo-de-hoy')

  if (!anchor) {
    console.warn('⚠️  No se encontró ningún bloque de Guacharo Activo')
    await browser.close()
    cacheResultados = []
    return
  }

  // El contenedor real es el padre del <a id="…">
  const section = await anchor.evaluateHandle(a => a.parentElement)

  /*───────────────────────────────────────────────────
    2️⃣  Extrae SÓLO los <h4> dentro de esa sección
  ───────────────────────────────────────────────────*/
  const rawResultados = await section.$$eval('h4', headers => {
    const BASE = 'https://www.lottoresultados.com'
    return headers.map(h => {
      const hourText = h.textContent.trim()                  // "8:00 am"
      const raw      = h.nextElementSibling?.textContent.trim() || ''
      const [id, ...nameParts] = raw.split(/\s+/)
      const animal   = nameParts.join(' ')

      const imgEl = h.parentElement.querySelector('img.step-avatar-img')
      let src     = imgEl?.getAttribute('src') || ''
      if (src.startsWith('/')) src = BASE + src
      if (!src) src = `${BASE}/img/animalitos_webp_120x120/GuacharoActivo/${id.padStart(2,'0')}.webp`

      return { hour: hourText, animal, image: src }
    }).filter(x => x.animal && x.image)
  })

  /*───────────────────────────────────────────────────
    3️⃣  Filtra solo horas exactas (08‑19) & quita duplicados
  ───────────────────────────────────────────────────*/
  const horaA24 = str => {
    const [t, ampm] = str.split(' ')
    let [hh] = t.split(':').map(Number)
    if (ampm.toLowerCase() === 'pm' && hh !== 12) hh += 12
    if (ampm.toLowerCase() === 'am' && hh === 12) hh = 0
    return hh
  }

  const únicos = new Map()          // 1 resultado por hora
  for (const r of rawResultados) {
    const hh = horaA24(r.hour)
    if (r.hour.includes(':00') && hh >= 8 && hh <= 19) {
      únicos.set(hh, r)             // el último visto sobrescribe
    }
  }

  const resultados = Array.from(únicos.values())
    .sort((a, b) => horaA24(a.hour) - horaA24(b.hour)) // 08 → 19
    .slice(0, 12)                                      // sólo 12

  await browser.close()
  cacheResultados = resultados
  console.log(`✅ [scrape] Filtrados ${cacheResultados.length} resultados (08‑19h)`)
}

// Inicia el scraper (sin levantar puertos)
(async () => {
  try {
    await scrapeConPuppeteer();
    cron.schedule('0 * * * *', scrapeConPuppeteer); // cada hora refresca
  } catch (err) {
    console.error('🔥 Error arrancando scraper:', err);
  }
})();

// 2️⃣  Ruta pública
app.get('/api/animalitos-hourly', (_req, res) => {
  res.json(cacheResultados);
});

// 3️⃣  💡 Esto es lo ÚNICO que necesitas para Vercel:
export default app;   // 👈 Vercel lo envuelve en una función serverless
