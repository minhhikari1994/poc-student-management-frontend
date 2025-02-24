# builder
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build

# runner
FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.output ./
CMD ["node", "server/index.mjs"]
