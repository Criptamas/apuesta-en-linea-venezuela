FROM oven/bun:1.1

WORKDIR /app
COPY backend/ ./backend
WORKDIR /app/backend

# 🩹 libs que Chrome necesita
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      ca-certificates \
      fonts-liberation \
      libasound2 \
      libatk1.0-0 \
      libatk-bridge2.0-0 \
      libcairo2 \
      libdrm2 \
      libexpat1 \
      libfontconfig1 \
      libgbm1 \
      libgcc1 \
      libglib2.0-0 \
      libgtk-3-0 \
      libnspr4 \
      libnss3 \
      libpango-1.0-0 \
      libpangocairo-1.0-0 \
      libstdc++6 \
      libx11-6 \
      libx11-xcb1 \
      libxcb1 \
      libxcomposite1 \
      libxcursor1 \
      libxdamage1 \
      libxext6 \
      libxfixes3 \
      libxi6 \
      libxrandr2 \
      libxrender1 \
      libxss1 \
      libxtst6 \
      wget \
      xdg-utils && \
    rm -rf /var/lib/apt/lists/*

# deps JS
RUN bun install

EXPOSE 3001
CMD ["bun", "index.js"]
