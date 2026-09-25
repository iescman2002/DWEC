# 1. Usamos la versión ligera de Node.js en Alpine Linux
FROM node:20-alpine

# 2. Definimos la carpeta de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiamos package.json para gestionar las dependencias
COPY package*.json ./

# 4. Instalamos las dependencias
RUN npm install

# 5. Copiamos el resto del código del proyecto
COPY . .

# 6. Exponemos el puerto de Vite
EXPOSE 5173

# 7. Comando por defecto para arrancar en desarrollo
CMD ["npm", "run", "dev", "--", "--host"]