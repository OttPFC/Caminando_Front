import { Image } from "./image";
import { IPosition } from "./position";

export interface IStep {
  id: number;
  description: string;
  arrivalDate: string;
  departureDate: string;
  position?: IPosition;
  images?: Image[];
  like:number,
  comments: Comment[];
}
