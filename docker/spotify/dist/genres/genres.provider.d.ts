import { GenreAlbum } from "./genres-albums.entity";
import { Genres } from "./genres.entity";
export declare const genresProviders: ({
    provide: string;
    useValue: typeof Genres;
} | {
    provide: string;
    useValue: typeof GenreAlbum;
})[];
