import { AccessInfo } from "../userManagerPage/accessInfo";
import { PermissionInfo } from "../userManagerPage/permissionInfo";
import { RoleInfo } from "../userManagerPage/roleInfo";

export interface AvaiableUser {
    role:RoleInfo,
    access:AccessInfo,
    permissions:PermissionInfo[]
}