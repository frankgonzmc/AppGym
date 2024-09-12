# Usa una imagen base oficial de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR app

# Copia el archivo package.json y package-lock.json (o yarn.lock) al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código fuente al contenedor
COPY . .

# Expone el puerto en el que Vite sirve la aplicación
EXPOSE 5173

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "run", "dev", "--", "--host"]