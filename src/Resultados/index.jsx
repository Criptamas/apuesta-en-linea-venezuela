// src/pages/Resultados.jsx
import React, { useEffect, useState } from 'react'
import { Header } from '../Header/index'
import { Footer } from '../Footer/index'

function Resultados() {
  const [horarios, setHorarios] = useState([])

  useEffect(() => {
    fetch('/api/animalitos-hourly')
      .then(r => {
        if (!r.ok) throw new Error(`Status ${r.status}`);
        return r.json();
      })
      .then(setHorarios)
      .catch(err => console.error('Front fetch error:', err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Resultados por Hora
        </h1>

        {horarios.length === 0 ? (
          <p className="text-center text-gray-500">Cargando o sin datos…</p>
        ) : (
          <div className="flex flex-col space-y-4">
            {horarios.map(({ hour, animal, image }, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4"
              >
                {/* Hora */}
                <span className="text-orange-500 font-bold text-lg sm:text-xl w-full sm:w-auto text-center sm:text-left">
                  {hour}
                </span>

                {/* Imagen redonda */}
                <img
                  src={image}
                  alt={animal}
                  className="w-16 h-16 rounded-full border border-gray-200 object-contain"
                />

                {/* Nombre */}
                <span className="text-gray-800 font-medium text-lg text-center sm:text-left">
                  {animal}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
export { Resultados }