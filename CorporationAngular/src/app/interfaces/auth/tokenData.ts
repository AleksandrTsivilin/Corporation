import { AvaiableUser } from "./avaiablesUserForm";

export interface TokenData{
    userId:number,
    username:string,
    avaiables:AvaiableUser[],
    department:number,
    factory:number,
    region:number
}

// export interface Avaiable{
//     Role:string,
//     Access:string,
//     Permissions:string[]
// }
// export interface RoleUser{
//     Title:string,
//     Permissions:PermissionUser[],
//     access:Access
// }

// export interface PermissionUser{
//     Title:string
// }

// export interface Access{
//     title:string
// }

