import { PermissionAction } from "../permissionAction";
import { AccessAction } from "./accessAction";
import { AccessInfo } from "./accessInfo";
import { RoleInfo } from "./roleInfo";



export interface AvaiableUserAction{
    role:RoleInfo,
    permissions:PermissionAction[],
    accessId:number
}