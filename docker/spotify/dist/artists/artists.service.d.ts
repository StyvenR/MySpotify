import { Artists } from "./artists.entity";
export declare class ArtistsService {
    private artistsRepository;
    constructor(artistsRepository: typeof Artists);
    findAll(limit?: number, page?: number): Promise<Artists[]>;
    findOne(id: number): Promise<Artists>;
    search(query: string): Promise<Artists[]>;
}
