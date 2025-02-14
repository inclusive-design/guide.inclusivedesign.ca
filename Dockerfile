FROM node:16-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM nginx:1.27.4-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
