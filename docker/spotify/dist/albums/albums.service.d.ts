import { Tracks } from "src/tracks/tracks.entity";
import { TracksService } from "../tracks/tracks.service";
import { Albums } from "./albums.entity";
export declare class AlbumsService {
    private albumsRepository;
    private tracksService;
    constructor(albumsRepository: typeof Albums, tracksService: TracksService);
    findAll(limit?: number, page?: number): Promise<Albums[]>;
    findOne(id: number): Promise<{
        album: Albums;
        tracks: Tracks[];
    }>;
    findByArtist(id: number): Promise<Albums[]>;
    search(query: string): Promise<Albums[]>;
}
