FROM node:20-alpine AS builder
WORKDIR /app

# Prisma нужно определить версию OpenSSL на этапе генерации клиента
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate && npm run build

FROM node:20-alpine
WORKDIR /app

# Prisma нужно загрузить движок на этапе migrate deploy и работы приложения
RUN apk add --no-cache openssl

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./
EXPOSE 3000
CMD ["node", "dist/index.js"]