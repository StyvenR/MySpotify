import { GenresService } from "./genres.service";
export declare class GenresController {
    private genresService;
    constructor(genresService: GenresService);
    findAll(page?: number, limit?: number): Promise<import("./genres.entity").Genres[]>;
    findOne(id: number): Promise<{
        genre: import("./genres.entity").Genres;
        albums: number[];
    }>;
}
