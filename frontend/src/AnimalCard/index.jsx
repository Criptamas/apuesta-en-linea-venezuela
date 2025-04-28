import React from 'react';

function AnimalCard({ icon, name }) {
  return (
    <div className="w-20 h-20 bg-[#F7F9FB] rounded-lg flex flex-col items-center justify-center">
      <img src={icon} alt={name} className="w-10 h-10 md:w-12 md:h-12" />
      <span className="mt-2 text-xs md:text-sm text-[#0F3D91]">{name}</span>
    </div>
    )
}

export { AnimalCard }