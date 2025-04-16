"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genresProviders = void 0;
const genres_albums_entity_1 = require("./genres-albums.entity");
const genres_entity_1 = require("./genres.entity");
exports.genresProviders = [
    {
        provide: 'GENRES_REPOSITORY',
        useValue: genres_entity_1.Genres
    },
    {
        provide: 'GENRES_ALBUMS_REPOSITORY',
        useValue: genres_albums_entity_1.GenreAlbum
    }
];
//# sourceMappingURL=genres.provider.js.map