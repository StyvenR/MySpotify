import { Tracks } from '../tracks/tracks.entity';
import { Albums } from './albums.entity';
import { AlbumsService } from './albums.service';
export declare class AlbumsController {
    private albumsService;
    constructor(albumsService: AlbumsService);
    getAlbums(page?: number, limit?: number): Promise<Albums[]>;
    getAlbum(id: number): Promise<{
        album: Albums;
        tracks: Tracks[];
    }>;
    getAlbumsForArtist(id: number): Promise<Albums[]>;
}
