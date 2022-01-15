import { PermissionAction } from "../permissionAction";
import { AccessAction } from "./accessAction";

export interface AvaiableUser{
    role:string ,
    permissions:PermissionAction[],
    access:AccessAction[] 
}