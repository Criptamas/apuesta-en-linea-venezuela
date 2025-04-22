# Dockerfile  (raíz del repo)
FROM oven/bun:1.1

WORKDIR /app
COPY backend/ ./backend
WORKDIR /app/backend

RUN bun install       

EXPOSE 3001            
CMD ["bun", "index.js"]
