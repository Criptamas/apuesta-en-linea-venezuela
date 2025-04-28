import axios from 'axios';
(async () => {
  try {
    const { data } = await axios.get(
      'https://guacharoactivo.com.ve/resultados',
      { timeout: 8000, headers: { 'User-Agent': 'Mozilla/5.0' } }
    );
    console.log('✅ OK, HTML slice:', data.slice(0,200));
  } catch(e) {
    console.error('❌ fallo en test-scrape:', e.message);
  }
})();