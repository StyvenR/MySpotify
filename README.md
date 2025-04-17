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

2. **Installation et démarrage du backend**
  ```bash
  cd Backend
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