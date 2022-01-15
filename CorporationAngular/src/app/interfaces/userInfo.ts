import { Access } from "./userManagerPage/access";

export interface UserInfo{
    [x: string]: any;
    id:number 
    username:string ,
    firstname:string 
    roles:Role[] 
}

export interface Role{
    title:string ,
    permissions:Permission[],
    access:Access 
}



export interface Permission{
    title:string 
}
