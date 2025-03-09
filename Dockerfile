# builder
FROM node:22.13.1-alpine AS builder
ENV NUXT_PUBLIC_API_BASE_URL="https://localhost:50000"
WORKDIR /app
ADD . /app/
RUN npm i -g pnpm
RUN pnpm install && pnpm run build

# runner
FROM node:22.13.1-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.output ./
CMD ["node", "server/index.mjs"]
