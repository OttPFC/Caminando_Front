import { Image } from "./image";

export interface IRegisterUser {
    id : number;
    firstName:string;
    lastName:string;
    username:string;
    email:string;
    password?:string;
    city:string;
    roles:string
    loggedIn:boolean;
    image:Image
    follow:number;
    followers:number;
    bio:string;
}
