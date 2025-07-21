######################## Etapa 1: build ########################
FROM node:20 AS build
WORKDIR /app

# solo dependencias
COPY package*.json ./
RUN npm ci

# código fuente
COPY . .
# compila TypeScript → dist/
RUN npm run build

####################### Etapa 2: runtime #######################
FROM node:20-slim
WORKDIR /app

# copia salida compilada y package.json
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
RUN npm ci --omit dev        # dependencias prod

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["node", "dist/server.js"]