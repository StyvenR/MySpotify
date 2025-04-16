# Étape 1 : Utilise une image Node.js LTS
FROM node:18

# Crée un dossier pour l'app dans le conteneur
WORKDIR /app

# Copie les fichiers nécessaires
COPY package*.json ./
COPY dist ./dist

# Installe uniquement les dépendances en production
RUN npm install --only=production

# Démarre l'application (modifie selon ton point d'entrée)
CMD ["node", "dist/main.js"]