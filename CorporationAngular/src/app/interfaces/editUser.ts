export interface EditUser{
    id:number | null,
    roles:Roles[] | null
}

interface Roles{
    title:string | null,
    permissions:Permission[] | null
}

interface Permission{
    title:string | null,
    isSelected:boolean | null
}

