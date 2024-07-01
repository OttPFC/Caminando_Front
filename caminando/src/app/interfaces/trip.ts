import { Image } from "./image";
import { IRegisterUser } from "./register-user";
import { IStep } from "./step";

export interface ITrip {
    id : number;
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    status: string,
    privacy:string
    user: IRegisterUser,
    steps: IStep[],
    coverImage: Image,
    
}
