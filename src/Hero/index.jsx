import React from 'react';
import { Button } from './Button.jsx';
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
          <div className="flex justify-center my-6 space-x-4">
          <Button
            label="Ver Resultados"
            to="/resultados-hora"
            variant="primary"
          />
          {/* <Button
            label="APOSTAR AHORA"
            variant="primary"
          /> */}
        </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <AnimalitosCarrusel/>
        </div>

      </div>
    </section>
  );
}

export { Hero }