import { Image } from "./image";

export interface IStep {
    id : number;
    description: string;
    arrivalDate: Date;
    departureDate: Date;
    images:Image[];
}
