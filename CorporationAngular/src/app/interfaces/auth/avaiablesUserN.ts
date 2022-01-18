
// import { AccessInfo } from "../userManagerPage/accessInfo";
// import { PermissionInfo } from "../userManagerPage/permissionInfo";
// import { RoleInfo } from "../userManagerPage/roleInfo";

// export interface AvaiableUserN{
//     role:RoleInfo,
//     access:AccessInfo,
//     permissions: PermissionInfo []    

// }

// export interface AvaiableUserN{
//     roleId:number,
//     access:AccessInfo,
//     permissions: PermissionInfo []     

// }

export interface AvaiableUserN{
    roleId:number | null,
    accessId:number,
    permissionsId:number[]
}