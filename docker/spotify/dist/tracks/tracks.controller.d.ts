import { Tracks } from './tracks.entity';
import { TracksService } from './tracks.service';
export declare class TracksController {
    private artistsService;
    constructor(artistsService: TracksService);
    getArtist(id: number): Promise<Tracks>;
}
