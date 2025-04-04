FROM node:18-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i -g @nestjs/cli

# Ambiente de desenvolvimento
FROM base as dev
RUN npm ci
COPY . .

# Ambiente de produção
FROM base as prod
RUN npm ci --omit=dev  # Instalar apenas dependências de produção
COPY . .
RUN npm run build
CMD ["node", "dist/main"]  # Adicionando a execução correta do servidor
