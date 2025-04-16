import { Artists } from './artists.entity';
import { ArtistsService } from './artists.service';
export declare class ArtistsController {
    private artistsService;
    constructor(artistsService: ArtistsService);
    getArtists(page?: number, limit?: number): Promise<Artists[]>;
    getArtist(id: number): Promise<Artists>;
}
