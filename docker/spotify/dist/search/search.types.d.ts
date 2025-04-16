import { Albums } from "../albums/albums.entity";
import { Artists } from "../artists/artists.entity";
import { Genres } from "../genres/genres.entity";
export declare type QueryType = 'artist' | 'genre' | 'album';
export declare enum QueryTypeEnum {
    Artist = "artist",
    Genre = "genre",
    Album = "album"
}
export interface SearchResult {
    albums: Albums[];
    genres: Genres[];
    artists: Artists[];
}
