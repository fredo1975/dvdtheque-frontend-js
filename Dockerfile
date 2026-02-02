# Étape 1 : Build de l'application
FROM node:20-alpine AS build

WORKDIR /app

# Installation des dépendances (optimisation du cache)
COPY package*.json ./
RUN npm install

# Copie du code source et build
COPY . .
RUN npm run build

# Étape 2 : Serveur de production (Nginx)
FROM nginx:stable-alpine

# Copie des fichiers buildés depuis l'étape précédente
# Note : Si vous utilisez Vite, le dossier est souvent 'dist', sinon 'build'
COPY --from=build /app/dist /usr/share/nginx/html

# Exposition du port 5173
EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]