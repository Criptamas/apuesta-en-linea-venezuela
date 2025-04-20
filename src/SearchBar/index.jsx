import React from 'react';
import searchIcon from '/assets/search.svg';

function SearchBar() {
  return (
    <div className="w-full px-4 py-2 md:px-6 lg:px-8">
      <div className="flex items-center bg-[#EFF5F8] rounded-lg px-3 py-2 md:px-4 md:py-3">
        <img
          src={searchIcon}
          alt="Buscar"
          className="w-5 h-5 mr-2 md:w-6 md:h-6"
        />
        <input
          type="text"
          placeholder="Lotería › Animalitos"
          className="
            flex-1 
            bg-transparent 
            focus:outline-none 
            text-[#0F3D91] 
            placeholder-[#6B7280] 
            text-sm 
            md:text-base
          "
        />
      </div>
    </div>
  );
}

export { SearchBar }
