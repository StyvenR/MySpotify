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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const tracks_service_1 = require("../tracks/tracks.service");
let AlbumsService = class AlbumsService {
    constructor(albumsRepository, tracksService) {
        this.albumsRepository = albumsRepository;
        this.tracksService = tracksService;
    }
    async findAll(limit = 10, page) {
        if (page) {
            const offset = (page - 1) * limit >= 0 ? (page - 1) * limit : 0;
            return await this.albumsRepository.findAll({ limit: parseInt(limit.toString()), offset });
        }
        return this.albumsRepository.findAll();
    }
    async findOne(id) {
        const album = await this.albumsRepository.findByPk(id);
        const tracks = await this.tracksService.findByAlbum(id);
        return { album, tracks };
    }
    async findByArtist(id) {
        return this.albumsRepository.findAll({
            where: {
                artist_id: id
            }
        });
    }
    async search(query) {
        return this.albumsRepository.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { name: { [sequelize_1.Op.like]: '%' + query + '%' } },
                    { description: { [sequelize_1.Op.like]: '%' + query + '%' } }
                ]
            }
        });
    }
};
AlbumsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("ALBUMS_REPOSITORY")),
    __metadata("design:paramtypes", [Object, tracks_service_1.TracksService])
], AlbumsService);
exports.AlbumsService = AlbumsService;
//# sourceMappingURL=albums.service.js.map