import { ArtistsService } from '../artists/artists.service';
import { GenresService } from '../genres/genres.service';
import { AlbumsService } from '../albums/albums.service';
import { QueryTypeEnum, SearchResult } from './search.types';
export declare class SearchService {
    private albumService;
    private genreService;
    private artistService;
    constructor(albumService: AlbumsService, genreService: GenresService, artistService: ArtistsService);
    search(query: string, type: QueryTypeEnum): Promise<SearchResult>;
}
