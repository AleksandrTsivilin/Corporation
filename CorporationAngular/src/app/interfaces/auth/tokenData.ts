export interface TokenData{
    userId:number,
    fullname:string,
    avaiables:Avaiable[]
}

export interface Avaiable{
    Role:string,
    Access:string,
    Permissions:string[]
}
export interface RoleUser{
    Title:string,
    Permissions:PermissionUser[],
    access:Access
}

export interface PermissionUser{
    Title:string
}

export interface Access{
    title:string
}

// export interface TokenData{
//     userId:number
// }