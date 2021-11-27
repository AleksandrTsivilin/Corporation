export interface UserInfo{
    [x: string]: any;
    id:number 
    username:string ,
    firstname:string 
    roles:Role[] 
}

export interface Role{
    title:string ,
    permissions:Permission[] 
}

// export interface PermissionAction{
//     title:string | null,
//     isSelected:boolean | null
// }

export interface Permission{
    title:string 
}
