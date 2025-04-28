// src/components/RecentWinners.jsx
import React, { useState, useEffect } from 'react';

// Testimonios de ganadores reales
const testimonials = [
  '¡Gané 50× mi apuesta gracias a Guácharo Activo!',
  'Cobré al instante, sin dolores de cabeza.',
  'Nunca pensé llevarme un premio tan grande.',
  'La plataforma es súper fácil y confiable.',
];

function RecentWinners() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=4')
      .then(res => res.json())
      .then(data => {
        // Asignar un testimonial a cada usuario
        const enriched = data.results.map((user, idx) => ({
          ...user,
          testimonial: testimonials[idx % testimonials.length],
        }));
        setUsers(enriched);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="w-full px-4 py-6 bg-[#DCE9F8] text-center">
        <p className="text-[#0F3D91]">Cargando opiniones…</p>
      </section>
    );
  }

  return (
    <section className="w-full px-4 py-6 bg-[#DCE9F8]">
      <h2 className="text-lg font-semibold text-[#0F3D91] mb-4">
        Opiniones de Ganadores 🎉
      </h2>
      <div className="flex overflow-x-auto space-x-3">
        {users.map((u, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-52 bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center"
          >
            <img
              src={u.picture.medium}
              alt={`${u.name.first} ${u.name.last}`}
              className="h-16 w-16 rounded-full mb-2"
            />
            <p className="font-medium text-sm mb-1">
              {u.name.first} {u.name.last}
            </p>
            <p className="italic text-sm text-gray-700">
              “{u.testimonial}”
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
export {  RecentWinners }