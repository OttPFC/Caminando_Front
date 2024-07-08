import { IStep } from "./step";

export interface IPosition {
    latitude: number;
    longitude: number;
    timestamp: string;
    nomeLocalita: string;
    step?:IStep
}
