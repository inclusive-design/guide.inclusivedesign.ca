FROM node:12.18.0-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git 

COPY package.json ./

RUN npm install

COPY . ./

# The echo command is necessary to work around a bug in docpad 6.79.4
RUN echo | $(npm bin)/docpad generate --env static --silent 


FROM nginx:1.18.0-alpine

COPY --from=builder /app/out /usr/share/nginx/html
