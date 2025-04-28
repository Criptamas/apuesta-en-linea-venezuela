function AnimalResult({ img, hora, numero, animal, fecha }) {
  return (
    <div
      className="
        bg-white 
        rounded-2xl 
        overflow-hidden 
        shadow-md 
        transform transition 
        duration-300 ease-out 
        hover:-translate-y-1 
        hover:shadow-xl
        flex flex-col
      "
    >
      {/* Imagen */}
      <div className="overflow-hidden">
        <img
          src={img}
          alt={animal}
          className="w-full h-52 object-cover"
        />
      </div>

      {/* Cuerpo con hora, número y nombre */}
      <div className="p-4 text-center flex-1 space-y-1">
        <p className="text-yellow-500 font-semibold">{hora}</p>
        <p className="text-2xl font-bold text-gray-800">{numero}</p>
        <p className="text-lg text-gray-600 capitalize">{animal}</p>
      </div>

      {/* Pie de fecha */}
      <div className="bg-yellow-50 text-center text-sm text-gray-700 py-2">
        {fecha}
      </div>
    </div>
  );
}
export { AnimalResult }