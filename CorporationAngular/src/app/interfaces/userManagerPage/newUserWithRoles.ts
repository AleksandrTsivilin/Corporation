import { Role } from "../userInfo";

export interface NewUserWithRoles {
    fullname:string,
    username:string,
    password:string,
    email:string,
    roles:Role[]
}