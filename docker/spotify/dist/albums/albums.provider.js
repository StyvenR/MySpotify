"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.albumsProviders = void 0;
const albums_entity_1 = require("./albums.entity");
exports.albumsProviders = [
    {
        provide: 'ALBUMS_REPOSITORY',
        useValue: albums_entity_1.Albums
    }
];
//# sourceMappingURL=albums.provider.js.map