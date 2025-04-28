import React from 'react';
import { Swiper, SwiperSlide} from 'swiper/react';
import { Parallax } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/parallax'
import guacharoIcon  from '/assets/guacharoIcon.png';
import pumaIcon      from '/assets/pumaIcon.png';
import delfinIcon    from '/assets/delfinIcon.png';
import camaleonIcon  from '/assets/camaleonIcon.png';
import pandaIcon     from '/assets/pandaIcon.png';
import ballenaIcon   from '/assets/ballenaIcon.png';
import caracolIcon   from '/assets/caracolIcon.png';
import gavilanIcon   from '/assets/gavilanIcon.png';
import guacamayaIcon from '/assets/guacamayaIcon.png';
import turpialIcon   from '/assets/turpialIcon.png';
import pulpoIcon     from '/assets/pulpoIcon.png';
import tiburonIcon   from '/assets/tiburonIcon.png';



const animals = [
  { name: 'La Ballena', img: ballenaIcon, payout: 'x60'  },
  { name: 'El Camaleon', img: camaleonIcon, payout: 'x60'  },
  { name: 'El Turpial', img: turpialIcon, payout: 'x60'  },
  { name: 'La Guacamaya', img: guacamayaIcon, payout: 'x60'  },
  { name: 'El Gavilan', img: gavilanIcon, payout: 'x60'  },
  { name: 'El Caracol', img: caracolIcon, payout: 'x60'  },
  { name: 'El Puma', img: pumaIcon, payout: 'x60'   },
  { name: 'El Panda', img: pandaIcon, payout: 'x60'  },
  { name: 'El Tiburon', img: tiburonIcon, payout: 'x60'  },
  { name: 'El Guacharo', img: guacharoIcon, payout: 'x60'  },
  { name: 'El Pulpo', img: pulpoIcon, payout: 'x60'  },
  { name: 'El Delfin', img: delfinIcon, payout: 'x60'},
  
]


function AnimalitosCarrusel() {
  return (
  <div className='w-full py-8'>
    <Swiper
      modules={[Parallax]}
      spaceBetween={16}
      speed={600}
      parallax={true}
      breakpoints={{
        320: { slidesPerView: 1.5 },
        640: { slidesPerView: 2.5 },
        768: { slidesPerView: 3.5 },
        1024: { slidesPerView: 5 },
      }}
    >
      {
        animals.map((a, i) =>(
          <SwiperSlide key={i}>
            <div className='group bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105'>

            <div 
            className='h-40 bg-center bg-cover'
            style={{ backgroundImage: `url(${a.img})` }}
            data-swiper-parallax='-20%'
            />

            <div className='p-4 text-center'>

              <h3 className='text-lg font-semibold'>{a.name}</h3>

              <p className='text-sm text-gray-500'> Payout {a.payout}</p>
            </div>
          </div>
          </SwiperSlide>
        ))}
    </Swiper>
  </div>
  );
}
export  { AnimalitosCarrusel }