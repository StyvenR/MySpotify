import { Model } from "sequelize-typescript";
export declare class Albums extends Model {
    id: number;
    artist_id: number;
    name: string;
    description: string;
    cover: string;
    cover_small: string;
    release_date: number;
    popularity: number;
}
