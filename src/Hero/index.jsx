// src/components/Hero.jsx
import React from 'react';
import { AnimalitosCarrusel } from '../AnimalitosCarrusel/index.jsx';

function Hero() {
  return (
    <section className="flex-grow w-full px-4 py-8 bg-[#EFF5F8]">
      <div className="flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
      
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-[#0F3D91] mb-3">
            LOTERÍA DE ANIMALITOS
          </h1>
          <p className="text-sm text-[#374151] mb-4">
            ¡Apuesta por tu animal favorito y vive la emoción de ganar!
          </p>
          <button className="px-6 py-3 bg-[#F26B32] text-white font-semibold rounded-md text-sm">
            APOSTAR AHORA
          </button>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <AnimalitosCarrusel/>
        </div>

      </div>
    </section>
  );
}

export { Hero }