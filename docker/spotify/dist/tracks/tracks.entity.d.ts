import { Model } from "sequelize-typescript";
export declare class Tracks extends Model {
    id: number;
    album_id: number;
    name: string;
    track_no: number;
    duration: number;
    mp3: string;
}
