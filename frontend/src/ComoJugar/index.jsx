// src/components/ComoJugar.jsx
import React from 'react';
// Importa aquí tus iconos line‑art en SVG o PNG
import selectIcon from '/assets/selectIcon.svg';
import amountIcon from '/assets/amountIcon.svg';
import collectIcon from '/assets/collectIcon.svg';

const steps = [
  {
    id: 1,
    title: 'Selecciona tu animalito',
    icon: selectIcon,
    desc: 'Escoge entre los 38 animalitos tradicionales.'
  },
  {
    id: 2,
    title: 'Ingresa tu monto',
    icon: amountIcon,
    desc: 'Define cuánto quieres apostar en bolívares o USD.'
  },
  {
    id: 3,
    title: '¡Cobra tu premio!',
    icon: collectIcon,
    desc: 'Recibe tu ganancia al instante, sin complicaciones.'
  }
];

function ComoJugar() {
  return (
    <section className="w-full px-4 py-8 bg-[#DCE9F8]">
      <h2 className="text-xl font-semibold text-[#0F3D91] mb-6 text-center">
        Cómo Apostar en 3 Pasos 📜
      </h2>
      <div className="flex flex-col sm:flex-row justify-between gap-6 max-w-4xl mx-auto">
        {steps.map(step => (
          <div
            key={step.id}
            className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center
                       transform transition hover:-translate-y-1"
          >
            <img
              src={step.icon}
              alt={step.title}
              className="h-16 w-16 mb-4"
            />
            <h3 className="font-bold text-lg text-[#0F3D91] mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
export { ComoJugar }