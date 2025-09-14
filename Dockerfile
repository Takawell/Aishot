# --- Stage 1: Build dependencies ---
FROM node:18-bullseye-slim AS deps
WORKDIR /app

# Install system deps for Playwright
RUN apt-get update && apt-get install -y \
  libnss3 libatk1.0-0 libatk-bridge2.0-0 libxkbcommon0 libxcomposite1 \
  libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2 libpangocairo-1.0-0 \
  libpango-1.0-0 libcairo2 libatspi2.0-0 \
  curl unzip fontconfig locales \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./
RUN npm install

# --- Stage 2: Build app ---
FROM node:18-bullseye-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install browsers for Playwright
RUN npx playwright install --with-deps

RUN npm run build

# --- Stage 3: Production runtime ---
FROM node:18-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only necessary files
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json ./

# Expose Next.js port
EXPOSE 3000

CMD ["npm", "start"]
