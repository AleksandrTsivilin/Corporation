import { Role } from "../userInfo";

export interface NewUserWithRoles {
    employeeId:number,
    username:string,
    password:string,
    email:string,
    roles:Role[]
}