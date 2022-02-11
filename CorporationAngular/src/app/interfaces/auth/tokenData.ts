import { AvaiableUser } from "./avaiablesUserForm";

export interface TokenData{
    userId:number,
    username:string,
    avaiables:AvaiableUser[],
    department:number,
    factory:number,
    region:number
}



