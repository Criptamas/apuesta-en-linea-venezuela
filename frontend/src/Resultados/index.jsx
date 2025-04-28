// src/pages/Resultados.jsx
import React, { useEffect, useState } from 'react'
import { Header } from '../Header/index'
import { Footer } from '../Footer/index'
import { AnimalResult } from '../AnimalResult/index'


function Resultados() {
  const [horarios, setHorarios] = useState([])

  useEffect(() => {
    fetch('/.netlify/functions/animalitos')
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => {
        setHorarios(data);
      })
      .catch(err => {
        console.error('Fetch error:', err);
      })
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Resultados por Hora
        </h1>

       <section className="py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Resultados por Hora</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {horarios.map((item, i) => (
            <AnimalResult
            key={i}
            img={item.img}
            hora={item.hora}
            numero={item.numero}
            animal={item.animal}
            fecha={item.fecha /* p.ej. "Lunes, 28 Abr 2025" */}
          />
        ))}
      </div>
    </section>
      </main>

      <Footer />
    </div>
  )
}
export { Resultados }