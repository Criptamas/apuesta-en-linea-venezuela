import axios from 'axios'
import cheerio from 'cheerio'

export default async function handler(req, res) {
 try{
  const { data } = await axios.get('https://guacharoactivo.com.ve/resultados')
  const $ = cheerio.load(data)
  const resultados = []

  $('section.min-h-[100vh] .grid > div').each((i, el) =>{
   const img = $(el).find('img').attr('src')
   const hora = $(el).find('p.text-yellow-500').text().trim()
   const numero = $(el).find('span').first().text().trim()
   const animal = $(el).find('span').last().text().trim()
   resultados.push({ img, hora, numero, animal })
  } )

  res.status(200).json(resultados)
 }
 catch (error) {
  console.error('❌ Error de tipo: ', error.message)

  res.status(500).json({ error: ' Scraping fallido :/ ' })
 }
}