

import { AvaiableUserForm } from "../auth/avaiablesUserN";

export interface NewUserWithAvaiables {
    employeeId:number | null,
    username:string,
    password:string,
    avaiables:AvaiableUserForm []
}