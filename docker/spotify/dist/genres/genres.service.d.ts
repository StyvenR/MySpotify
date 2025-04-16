import { GenreAlbum } from "./genres-albums.entity";
import { Genres } from "./genres.entity";
export declare class GenresService {
    private genresRepository;
    private genresAlbumsRepository;
    constructor(genresRepository: typeof Genres, genresAlbumsRepository: typeof GenreAlbum);
    findAll(limit?: number, page?: number): Promise<Genres[]>;
    findOne(id: number): Promise<{
        genre: Genres;
        albums: number[];
    }>;
    search(query: string): Promise<Genres[]>;
}
