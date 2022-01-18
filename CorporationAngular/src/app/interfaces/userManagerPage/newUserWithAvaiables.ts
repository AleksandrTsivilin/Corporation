
// export interface NewUserWithAvaiables {
//     employee:EmployeeInfo,
//     username:string,
//     password:string,
//     email:string,
//     avaiables: AvaiableUserN [] 
// }

import { AvaiableUserN } from "../auth/avaiablesUserN";

export interface NewUserWithAvaiables {
    employeeId:number | null,
    username:string,
    password:string,
    email:string,
    avaiables:AvaiableUserN []
}