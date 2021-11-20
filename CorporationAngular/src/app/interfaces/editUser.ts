export interface EditUser{
    id:number | null,
    roles:Roles[] | null
}

interface Roles{
    title:string | null,
    permissions:PermissionAction[] | null
}

interface PermissionAction{
    title:string | null,
    isSelected:boolean | null
}

