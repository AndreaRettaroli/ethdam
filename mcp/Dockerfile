FROM node:23-slim                           


RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app


COPY package.json pnpm-lock.yaml ./


RUN pnpm install --frozen-lockfile


COPY . .


RUN pnpm run build                         

EXPOSE 4000

CMD ["pnpm", "dev"]                        
