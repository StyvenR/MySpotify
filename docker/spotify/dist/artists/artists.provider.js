"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artistsProviders = void 0;
const artists_entity_1 = require("./artists.entity");
exports.artistsProviders = [
    {
        provide: 'ARTISTS_REPOSITORY',
        useValue: artists_entity_1.Artists
    }
];
//# sourceMappingURL=artists.provider.js.map