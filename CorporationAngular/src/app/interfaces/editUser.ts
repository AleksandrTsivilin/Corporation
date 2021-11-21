export interface EditUser{
    id:number | null,
    roles:Roles[] | null
}

interface Roles{
    title:string | null,
    permissions:PermissionAction[] | null
}

export interface PermissionAction{
    title:string | null,
    isSelected:boolean | null
}

