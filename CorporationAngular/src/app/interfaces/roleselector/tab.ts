import { ProductKeys } from "src/app/enums/productPage/productKeys"

// you can remove it after removing roleselector
export interface Tab{
    title:string,
    isActive:boolean
}



export interface TabRouter {
    title:string,
    router:string,
    additional:string,
    key:any
}