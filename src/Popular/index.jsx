// src/components/Popular.jsx
import React from 'react';
import { AnimalCard } from '../AnimalCard/index';
import pumaIcon from '/assets/pumaIcon.png';
import delfinIcon from '/assets/delfinIcon.png';
import turpialIcon from '/assets/turpialIcon.png';
import guacamayaIcon from '/assets/guacamayaIcon.png';

function Popular() {
  const animals = [
    { icon: pumaIcon,   name: 'El Perro'   },
    { icon: delfinIcon,name: 'El Elefante'},
    { icon: turpialIcon,  name: 'El Conejo'  },
    { icon: guacamayaIcon,  name: 'El Caimán'  },
  ];

  return (
    <section className=" flex-grow w-full px-4 py-6 bg-[#DCE9F8] md:px-6 lg:px-8">
      <h2 className="text-lg font-semibold text-[#0F3D91] mb-4">
        Popular Animalitos
      </h2>
      <div className="flex justify-between space-x-3">
        {animals.map(a => (
          <AnimalCard key={a.name} icon={a.icon} name={a.name} />
        ))}
      </div>
    </section>
  );
}

export { Popular }