import express from 'express';
import cors from 'cors';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

// Cron no es adecuado para entornos serverless, lo removemos
// import cron from 'node-cron';

const app = express();
app.use(cors());

// Configuración global para el scraping
const SCRAPE_TIMEOUT = 8000; // 8 segundos max para operaciones críticas
const CACHE_DURATION = 1800; // 30 minutos de caché

// Este caché solo funcionará durante la vida de la función serverless
// (no persiste entre invocaciones diferentes)
let cacheResultados = [];
let lastScrapingTime = 0;

// ---------------------  Scraper optimizado  ---------------------
async function scrapeConPuppeteer() {
  const BASE = 'https://www.lottoresultados.com';
  const now = Date.now();
  
  // Verificamos si tenemos un caché reciente (menos de 5 minutos)
  // Esto ayuda si múltiples usuarios llaman a la API simultáneamente
  if (cacheResultados.length > 0 && (now - lastScrapingTime) < 300000) {
    console.log('📋 Usando resultados en caché (< 5 min)');
    return cacheResultados;
  }
  
  console.log('🌐 [scrape] Iniciando Puppeteer…');

  try {
    const browser = await puppeteer.launch({
      args: [...chromium.args, '--disable-dev-shm-usage', '--no-sandbox'],
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      timeout: SCRAPE_TIMEOUT,
    });

    try {
      const page = await browser.newPage();
      
      // Optimizamos rendimiento del navegador bloqueando recursos innecesarios
      await page.setRequestInterception(true);
      page.on('request', (request) => {
        const resourceType = request.resourceType();
        if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
          request.abort();
        } else {
          request.continue();
        }
      });

      // Establecemos timeout para la navegación
      await page.goto(`${BASE}/resultados/animalitos`, { 
        waitUntil: 'domcontentloaded', // Más rápido que 'networkidle2'
        timeout: SCRAPE_TIMEOUT 
      });

      /*───────────────────────────────────────────────────
        1️⃣  Localiza la sección "Guacharo Activo"
            – primero la de AYER; si no existe, la de HOY
      ───────────────────────────────────────────────────*/
      let anchor = await page.$('#resultado-de-guacharo-activo-de-ayer');
      if (!anchor) anchor = await page.$('#resultado-de-guacharo-activo-de-hoy');

      if (!anchor) {
        console.warn('⚠️  No se encontró ningún bloque de Guacharo Activo');
        return [];
      }

      // El contenedor real es el padre del <a id="…">
      const section = await anchor.evaluateHandle(a => a.parentElement);

      /*───────────────────────────────────────────────────
        2️⃣  Extrae SÓLO los <h4> dentro de esa sección
      ───────────────────────────────────────────────────*/
      const rawResultados = await section.$$eval('h4', headers => {
        const BASE = 'https://www.lottoresultados.com';
        return headers.map(h => {
          const hourText = h.textContent.trim();                  // "8:00 am"
          const raw = h.nextElementSibling?.textContent.trim() || '';
          const [id, ...nameParts] = raw.split(/\s+/);
          const animal = nameParts.join(' ');

          const imgEl = h.parentElement.querySelector('img.step-avatar-img');
          let src = imgEl?.getAttribute('src') || '';
          if (src.startsWith('/')) src = BASE + src;
          if (!src) src = `${BASE}/img/animalitos_webp_120x120/GuacharoActivo/${id.padStart(2,'0')}.webp`;

          return { hour: hourText, animal, image: src };
        }).filter(x => x.animal && x.image);
      });

      /*───────────────────────────────────────────────────
        3️⃣  Filtra solo horas exactas (08‑19) & quita duplicados
      ───────────────────────────────────────────────────*/
      const horaA24 = str => {
        const [t, ampm] = str.split(' ');
        let [hh] = t.split(':').map(Number);
        if (ampm.toLowerCase() === 'pm' && hh !== 12) hh += 12;
        if (ampm.toLowerCase() === 'am' && hh === 12) hh = 0;
        return hh;
      };

      const únicos = new Map();          // 1 resultado por hora
      for (const r of rawResultados) {
        const hh = horaA24(r.hour);
        if (r.hour.includes(':00') && hh >= 8 && hh <= 19) {
          únicos.set(hh, r);             // el último visto sobrescribe
        }
      }

      const resultados = Array.from(únicos.values())
        .sort((a, b) => horaA24(a.hour) - horaA24(b.hour)) // 08 → 19
        .slice(0, 12);                                      // sólo 12

      // Actualizamos el caché y su timestamp
      cacheResultados = resultados;
      lastScrapingTime = Date.now();
      
      console.log(`✅ [scrape] Filtrados ${cacheResultados.length} resultados (08‑19h)`);
      return resultados;
    } finally {
      // Nos aseguramos de cerrar el navegador para liberar recursos
      await browser.close();
    }
  } catch (error) {
    console.error('🔥 Error en scrapeConPuppeteer:', error);
    
    // Si tenemos resultados en caché, los devolvemos incluso si son antiguos
    // En lugar de fallar completamente
    if (cacheResultados.length > 0) {
      console.log('⚠️ Usando resultados en caché antiguos debido a error');
      return cacheResultados;
    }
    
    // Si no hay nada en caché, devolvemos array vacío
    return [];
  }
}

<<<<<<< HEAD
app.get('/', async (_req, res) => {
  // Esto es TODO lo que se expone en /api/animalitos-hourly
  res.setHeader('Cache-Control', `s-maxage=${CACHE_DURATION}, stale-while-revalidate`);
  const resultados = await scrapeConPuppeteer();
  res.json({ timestamp: new Date().toISOString(), resultados });
=======
app.get('/ping', (_req, res) => res.send('pong'));

// Endpoint para obtener resultados
app.get('/', async (_req, res) => {
  try {
    res.setHeader('Cache-Control', `s-maxage=${CACHE_DURATION}, stale-while-revalidate`);
    const resultados = await scrapeConPuppeteer();
    res.json({
      timestamp: new Date().toISOString(),
      resultados
    });
  } catch (error) {
    console.error('🔥 Error en endpoint:', error);
    res.status(500).json({ error: 'Error al obtener resultados' });
  }
>>>>>>> 0078fbf1cdcae2893567a7913bd7536d7a0e08e4
});

// Este es el único export que necesitas para Vercel
export default app;