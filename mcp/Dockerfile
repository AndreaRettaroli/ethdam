FROM node:23-slim                           

# Use pnpm with Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy manifest files first – enables layer caching
COPY package.json pnpm-lock.yaml ./

# Install *all* deps (dev deps needed for `pnpm dev`)
RUN pnpm install --frozen-lockfile

# Now bring in the rest of the source (but NOT node_modules – see .dockerignore)
COPY . .

# Optional: TypeScript build step
RUN pnpm run build                         

EXPOSE 4000

# Run the dev script (uses tsx, so dev deps must exist)
CMD ["pnpm", "dev"]                        
