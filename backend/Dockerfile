# Imagen base con Bun + Node + npm
FROM oven/bun:1.1

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiamos solo la parte del backend (más liviano)
COPY backend/ ./backend

# Entramos a la carpeta backend
WORKDIR /app/backend

# Instalamos dependencias del backend (bun.lockb o package.json)
RUN bun install

# Comando que lanza tu API
CMD ["bun", "index.js"]
