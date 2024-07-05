import { Image } from "./image";
import { IPosition } from "./position";

export interface IStep {
    id : number;
    description: string;
    arrivalDate: Date;
    departureDate: Date;
    images:Image[];
    position: IPosition;
}
