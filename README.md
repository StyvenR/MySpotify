# Spotify Web Player

## Description

Ce projet est un lecteur multimédia en ligne exploitant une API pour afficher et gérer des albums, artistes et genres. Développé en React, il permet aux utilisateurs de parcourir et d’écouter des albums via un lecteur audio intégré.

## Équipe

Projet réalisé par un groupe de deux étudiants.

## Technologies utilisées

### Frontend
- **React** 19
- **React Router** v7
- **Tailwind CSS**
- **Vite** (bundler)

### Backend
- **Node.js**
- **Express**
- **MySQL**
- **bcrypt** (hachage de mots de passe)
- **CORS**

### Infrastructure
- **Docker** & **Docker Compose**
- **MySQL**

## Fonctionnalités

- Liste des albums (avec pagination)
- Détails d’un album (pistes avec lecteur audio)
- Liste des artistes
- Recherche d’albums, genres et artistes
- Page d’accueil avec albums aléatoires
- Page de connexion/login
- Page de profil utilisateur

## Structure du projet

```
MySpotify/
├── Backend/              # API Node.js/Express
│   ├── config/
│   │   └── db_config.js  # Configuration base de données (à créer)
│   ├── server.js         # Serveur principal
│   └── package.json
├── spotify/              # Application React
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── docker/               # Configuration Docker
│   ├── docker-compose.yml
│   ├── data/            # Données MySQL persistantes
│   └── logs/            # Logs Docker
└── README.md
```


## Installation et démarrage

### Prérequis
- **Node.js** (v18+)
- **npm** ou **yarn**
- **Docker** et **Docker Compose**

### Étapes

1. **Configuration de la base de données avec Docker**
  ```bash
  cd docker
  docker-compose up --build
  ```

2. **Configuration du backend**
  
  a. Créer le fichier de configuration de la base de données :
  ```bash
  cd Backend
  ```
  
  b. Créer le fichier `config/db_config.js` avec le contenu suivant :
  ```javascript
  // Backend/config/db_config.js
  const mysql = require('mysql2');

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'spotify'
  });

  module.exports = connection;
  ```
  
  c. Installer les dépendances et démarrer le serveur :
  ```bash
  npm install
  npm start
  ```
  Le serveur backend sera accessible sur [http://localhost:8000](http://localhost:8000).

3. **Installation et démarrage du frontend**
  ```bash
  cd spotify
  npm install
  npm run dev
  ```
  L'application sera accessible sur [http://localhost:5173](http://localhost:5173).

## API Endpoints

### Albums
- `GET /albums` - Liste tous les albums
- `GET /albums/:id` - Détails d'un album spécifique

### Artistes
- `GET /artists` - Liste tous les artistes
- `GET /artists/:id` - Détails d'un artiste spécifique

### Genres
- `GET /genres` - Liste tous les genres
- `GET /genres/:id` - Détails d'un genre spécifique

### Authentification
- `POST /register` - Inscription d'un nouvel utilisateur
- `POST /login` - Connexion utilisateur

## Dépannage

### Erreurs courantes

1. **Erreur "Cannot find module './config/db_config.js'"**
   - Vérifiez que le fichier `Backend/config/db_config.js` existe
   - Créez-le manuellement si nécessaire (voir section Configuration)

2. **Erreur de connexion à la base de données**
   - Vérifiez que Docker est démarré : `docker ps`
   - Redémarrez les conteneurs : `docker-compose down && docker-compose up`

3. **Port déjà utilisé**
   - Backend (8000) : `lsof -ti:8000 | xargs kill -9`
   - Frontend (5173) : `lsof -ti:5173 | xargs kill -9`

4. **Problèmes de dépendances**
   - Supprimez `node_modules/` et `package-lock.json`
   - Réinstallez : `npm install`

