import { PermissionAction } from "../permissionAction";
import { AccessAction } from "./accessAction";
import { RoleInfo } from "./roleInfo";

export interface AvaiableUser{
    role:RoleInfo ,
    permissions:PermissionAction[],
    access:AccessAction[] 
}