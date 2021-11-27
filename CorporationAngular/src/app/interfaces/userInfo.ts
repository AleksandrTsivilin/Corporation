export interface UserInfo{
    [x: string]: any;
    id:number | null
    username:string | null,
    firstname:string | null
    roles:Role[] 
}

export interface Role{
    title:string | null,
    permissions:Permission[] 
}

// export interface PermissionAction{
//     title:string | null,
//     isSelected:boolean | null
// }

export interface Permission{
    title:string 
}
