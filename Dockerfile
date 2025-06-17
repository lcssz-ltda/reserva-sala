# Dockerfile para NestJS + Prisma + SQLite
FROM node:22-alpine AS builder

# Define o diretório de trabalho dentro do container
# no Gemini está assim:
#WORKDIR /usr/src/app
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Gera o Prisma Client
RUN npx prisma generate

RUN npm run build

# Garante que a pasta do banco exista
RUN mkdir -p prisma

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
RUN npx prisma generate

EXPOSE 3000
CMD ["npm", "run", "start:prod"] 



