FROM node:22-alpine AS base
WORKDIR /app

# --- deps: install once, cached across builds ---
# --include=dev is explicit so this stage always installs devDependencies
# (typescript, @types/*) even if NODE_ENV=production leaks in as a
# build-time var from the platform (e.g. Coolify) — npm otherwise skips
# devDependencies under NODE_ENV=production, which breaks `tsc` below.
FROM base AS deps
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci --include=dev

# --- build: compile TypeScript ---
FROM deps AS build
COPY . .
RUN npx prisma generate
RUN npm run build

# --- runtime: minimal image, prod deps only ---
FROM base AS runtime
ENV NODE_ENV=production
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci --omit=dev && npx prisma generate
COPY --from=build /app/dist ./dist
# Uploaded media lands here at runtime. Mount a persistent volume at this
# path in production or uploads are lost on every redeploy.
RUN mkdir -p uploads/images uploads/videos

EXPOSE 4000
# Applies pending migrations, then starts the API. Safe to run on every
# deploy — Prisma tracks which migrations already ran and skips them.
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
