export interface TokenData{
    userId:number,
    fullname:string,
    roles:RoleUser[]
}

export interface RoleUser{
    title:string,
    permissions:PermissionUser[],
    access:Access
}

export interface PermissionUser{
    title:string
}

export interface Access{
    title:string
}