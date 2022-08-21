import { AvaiableUser } from "./auth/avaiablesUserForm";
import { DepartmentInfo } from "./location/department/departmentInfo";
import { EmployeeInfo } from "./employee/employeeInfo";
import { Access } from "./userManagerPage/access";


export interface UserInfo{
    [x: string]: any;
    id:number 
    username:string ,
    employee:EmployeeInfo,
    avaiables:AvaiableUser[] 
    fullname:string | null,
    department:DepartmentInfo,
    isBanned:boolean
}

export interface Role{
    title:string ,
    permissions:Permission[],
    access:Access 
}



export interface Permission{
    title:string 
}
