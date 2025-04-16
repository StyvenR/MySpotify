"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const genres_albums_entity_1 = require("../genres/genres-albums.entity");
const albums_entity_1 = require("../albums/albums.entity");
const artists_entity_1 = require("../artists/artists.entity");
const genres_entity_1 = require("../genres/genres.entity");
const tracks_entity_1 = require("../tracks/tracks.entity");
exports.databaseProviders = [
    {
        provide: "SEQUELIZE",
        useFactory: async () => {
            const sequelize = new sequelize_typescript_1.Sequelize({
                dialect: "mysql",
                host: process.env.DB_HOST || "localhost",
                port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 8080,
                username: process.env.DB_USER || "spoty",
                password: process.env.DB_PWD || "spotypwd",
                database: process.env.DB_NAME || "spotify",
                models: [artists_entity_1.Artists, albums_entity_1.Albums, tracks_entity_1.Tracks, genres_entity_1.Genres, genres_albums_entity_1.GenreAlbum]
            });
            await sequelize.sync();
            return sequelize;
        }
    }
];
//# sourceMappingURL=database.providers.js.map