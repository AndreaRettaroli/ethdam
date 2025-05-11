############################################
# Stage 1: Install dependencies & build
############################################
FROM oven/bun:1.1.3 AS builder

# Set working directory
WORKDIR /app

# ENV BUN_INSTALL_CONCURRENCY=3

# Copy manifest & lockfile
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Build the project (tsup)
RUN bun run build

#############################################
# Stage 2: Runtime
#############################################
FROM oven/bun:1.1.3

# Set working directory
WORKDIR /app

# Copy only build artifacts and production deps
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock ./bun.lock

# Install only production dependencies
RUN bun install --production

# Expose ports
EXPOSE 3000 5173

# Start application
CMD ["bun", "run", "start"]
