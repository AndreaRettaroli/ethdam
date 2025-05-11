FROM node:23-slim                           


RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app


COPY package.json pnpm-lock.yaml ./


RUN pnpm install --frozen-lockfile


COPY . .
              

EXPOSE 4021

CMD ["pnpm", "dev"]                        
