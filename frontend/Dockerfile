FROM node:22-alpine AS base
WORKDIR /app

# --- deps: install once, cached across builds ---
# --include=dev is explicit so this stage always installs devDependencies
# (vite, @sveltejs/kit, typescript) even if NODE_ENV=production leaks in as
# a build-time var from the platform (e.g. Coolify) — npm otherwise skips
# devDependencies under NODE_ENV=production, which breaks `vite build` below.
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --include=dev

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
