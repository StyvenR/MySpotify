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
exports.GenresService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
let GenresService = class GenresService {
    constructor(genresRepository, genresAlbumsRepository) {
        this.genresRepository = genresRepository;
        this.genresAlbumsRepository = genresAlbumsRepository;
    }
    async findAll(limit = 10, page) {
        if (page) {
            const offset = (page - 1) * limit >= 0 ? (page - 1) * limit : 0;
            return this.genresRepository.findAll({ offset, limit: parseInt(limit.toString()) });
        }
        return this.genresRepository.findAll();
    }
    async findOne(id) {
        const genre = await this.genresRepository.findByPk(id);
        const albums = await this.genresAlbumsRepository.findAll({
            where: {
                genre_id: id
            }
        });
        return {
            genre,
            albums: albums.map((e) => e.album_id)
        };
    }
    async search(query) {
        return this.genresRepository.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { name: { [sequelize_1.Op.like]: '%' + query + '%' } },
                ]
            }
        });
    }
};
GenresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("GENRES_REPOSITORY")),
    __param(1, (0, common_1.Inject)("GENRES_ALBUMS_REPOSITORY")),
    __metadata("design:paramtypes", [Object, Object])
], GenresService);
exports.GenresService = GenresService;
//# sourceMappingURL=genres.service.js.map