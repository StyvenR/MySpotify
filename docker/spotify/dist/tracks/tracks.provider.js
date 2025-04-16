"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tracksProviders = void 0;
const tracks_entity_1 = require("./tracks.entity");
exports.tracksProviders = [
    {
        provide: 'TRACKS_REPOSITORY',
        useValue: tracks_entity_1.Tracks
    }
];
//# sourceMappingURL=tracks.provider.js.map