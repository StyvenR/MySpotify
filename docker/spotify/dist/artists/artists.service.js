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
exports.ArtistsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
let ArtistsService = class ArtistsService {
    constructor(artistsRepository) {
        this.artistsRepository = artistsRepository;
    }
    async findAll(limit = 10, page) {
        if (page) {
            const offset = (page - 1) * limit >= 0 ? (page - 1) * limit : 0;
            return this.artistsRepository.findAll({ limit: parseInt(limit.toString()), offset });
        }
        return this.artistsRepository.findAll();
    }
    async findOne(id) {
        return this.artistsRepository.findByPk(id);
    }
    async search(query) {
        return this.artistsRepository.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { name: { [sequelize_1.Op.like]: '%' + query + '%' } },
                    { description: { [sequelize_1.Op.like]: '%' + query + '%' } },
                    { bio: { [sequelize_1.Op.like]: '%' + query + '%' } }
                ]
            }
        });
    }
};
ArtistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("ARTISTS_REPOSITORY")),
    __metadata("design:paramtypes", [Object])
], ArtistsService);
exports.ArtistsService = ArtistsService;
//# sourceMappingURL=artists.service.js.map