import React from 'react';

function Header() {
  return (
    <header
    className="
      w-full h-14 
      bg-[#0F3D91] 
      flex items-center justify-between 
      px-2 sm:px-4 md:px-6 lg:px-8
    "
  >
    {/* Logo + nombre */}
    <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
      <img
        src="/assets/logoGuacharoActivo.png"
        alt="Guácharo Activo"
        className="h-10 px-2 sm:h-8"
      />
      <span className="text-white font-bold text-base sm:text-lg md:text-xl">
        GUÁCHARO ACTIVO
      </span>
    </div>

    <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
      <button
        className="
          px-2 py-1 sm:px-3 sm:py-1.5 
          bg-[#55A2F2] rounded-md 
          text-white font-semibold 
          text-xs sm:text-sm md:text-base
        "
      >
        Unete
      </button>
      <button
        className="
          px-2 py-1 sm:px-3 sm:py-1.5 
          bg-[#F26B32] rounded-md 
          text-white font-semibold 
          text-xs sm:text-sm md:text-base
        "
      >
        Entra
      </button>
    </div>
  </header>
  );
}


export { Header }