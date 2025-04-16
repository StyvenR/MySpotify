import { Model } from "sequelize-typescript";
export declare class Artists extends Model {
    id: number;
    name: string;
    description: string;
    bio: string;
    photo: string;
}
