// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className=" mt-auto w-full bg-[#0F3D91] text-white px-4 py-6 md:px-8">
      {/* contenedor principal */}
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        {/* Logo + marca */}
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <span className="font-bold text-lg">GUÁCHARO ACTIVO</span>
          <span className="text-sm opacity-80">
            © {new Date().getFullYear()} – Todos los derechos reservados
          </span>
        </div>

        {/* Enlaces rápidos */}
        <nav className="flex flex-wrap gap-4 text-sm">
          <a href="#" className="hover:underline">
            Términos
          </a>
          <a href="#" className="hover:underline">
            Privacidad
          </a>
          <a href="#" className="hover:underline">
            Ayuda
          </a>
          <a href="#" className="hover:underline">
            Contacto
          </a>
        </nav>
      </div>
    </footer>
  );
}
export { Footer }