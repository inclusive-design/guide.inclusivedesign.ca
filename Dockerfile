FROM node:22-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . ./

RUN npm run build

FROM nginx:1.27.4-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
