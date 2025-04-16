import { Tracks } from "./tracks.entity";
export declare class TracksService {
    private tracksRepository;
    constructor(tracksRepository: typeof Tracks);
    findAll(): Promise<Tracks[]>;
    findOne(id: number): Promise<Tracks>;
    findByAlbum(id: number): Promise<Tracks[]>;
}
