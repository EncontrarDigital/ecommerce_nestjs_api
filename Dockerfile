FROM node:18-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --no-cache python3 make g++
RUN npm i -g @nestjs/cli

# Ambiente de desenvolvimento
FROM base as dev
RUN npm ci
COPY . .

# Ambiente de produção
FROM base as prod
COPY . .               
RUN npm ci --omit=dev --legacy-peer-deps  
RUN npm run build   
CMD ["node", "dist/main"]  
