# builder
FROM node:22.13.1-alpine AS builder
ARG NUXT_PUBLIC_API_BASE_URL=$NUXT_PUBLIC_API_BASE_URL
WORKDIR /app
ADD . /app/
RUN npm i -g pnpm
RUN pnpm install && NUXT_PUBLIC_API_BASE_URL="$NUXT_PUBLIC_API_BASE_URL" pnpm run build

# runner
FROM node:22.13.1-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.output ./
CMD ["node", "server/index.mjs"]
