FROM node:22-alpine AS base
WORKDIR /app

# --- deps: install once, cached across builds ---
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# --- build: PUBLIC_* vars are inlined into the client bundle at build time,
# so they must be passed as build args, not just runtime env vars. ---
FROM deps AS build
ARG PUBLIC_API_BASE_URL
ARG PUBLIC_ADMIN_EMAIL
ENV PUBLIC_API_BASE_URL=$PUBLIC_API_BASE_URL
ENV PUBLIC_ADMIN_EMAIL=$PUBLIC_ADMIN_EMAIL
COPY . .
RUN npm run build

# --- runtime: minimal image, prod deps only ---
FROM base AS runtime
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/build ./build

EXPOSE 3000
ENV PORT=3000
CMD ["node", "build/index.js"]
