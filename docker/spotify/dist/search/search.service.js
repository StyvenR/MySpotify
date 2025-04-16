"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const artists_service_1 = require("../artists/artists.service");
const genres_service_1 = require("../genres/genres.service");
const albums_service_1 = require("../albums/albums.service");
let SearchService = class SearchService {
    constructor(albumService, genreService, artistService) {
        this.albumService = albumService;
        this.genreService = genreService;
        this.artistService = artistService;
    }
    async search(query, type) {
        let albums, genres, artists = [];
        switch (type) {
            case 'album':
                albums = await this.albumService.search(query);
                break;
            case 'artist':
                artists = await this.artistService.search(query);
                break;
            case 'genre':
                genres = await this.genreService.search(query);
                break;
            default:
                break;
        }
        return {
            albums,
            genres,
            artists,
        };
    }
};
SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [albums_service_1.AlbumsService,
        genres_service_1.GenresService,
        artists_service_1.ArtistsService])
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map