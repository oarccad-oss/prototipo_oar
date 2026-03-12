# Etapa de construcción (Build stage)
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependencias usando lockfile para garantizar reproducibilidad
COPY package*.json ./
RUN npm ci

# Copiar código fuente y procesar el empaquetado de producción
COPY . .
RUN npm run build

# Etapa de ejecución (Runtime stage)
FROM node:20-alpine

WORKDIR /app

# Instalar servidor de archivos estáticos optimizado
RUN npm install -g serve

# Copiar los artefactos minimizados desde la etapa de compilación
COPY --from=builder /app/dist ./dist

# Configuración de puerto por defecto (Railway inyecta $PORT en ejecución)
ENV PORT=3000
EXPOSE $PORT

# Ejecutar el servicio. El flag '-s' gestiona el enrutamiento en Single Page Applications (SPA)
CMD serve -s dist -l tcp://0.0.0.0:${PORT}

#npm run dev

