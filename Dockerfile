# ==========================================
# OPTIMIZACIÓN PARA RAILWAY (Frontend SPA)
# ==========================================

# 1. Instalación de Dependencias (Capa de Caché)
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json package-lock.json ./
# Railway: npm ci es la forma más rápida de instalar dependencias limpias
RUN npm ci

# 2. Compilación (Build)
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Generamos el bundle de producción
RUN npm run build

# 3. Servidor de Producción (Nginx Ultra-Ligero)
# Reducimos el tamaño de la imagen de ~200MB a ~15MB
FROM nginx:stable-alpine AS runner

# Configuración optimizada para React/Vite en Railway
RUN echo 'server { \
    listen [PORT_REPLACE]; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
    # Optimización: Cache de larga duración para assets de Vite (tienen hash) \
    location /assets/ { \
        root /usr/share/nginx/html; \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Copiamos solo los archivos estáticos generados
COPY --from=builder /app/dist /usr/share/nginx/html

# Railway asigna un puerto dinámico mediante la variable $PORT.
# El comando CMD lo inyecta en la configuración de Nginx al arrancar.
CMD sed -i "s/\[PORT_REPLACE\]/${PORT:-80}/g" /etc/nginx/conf.d/default.conf && nginx -g "daemon off;"
