export interface TokenData{
    userId:number,
    fullname:string,
    roles:RoleUser[]
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