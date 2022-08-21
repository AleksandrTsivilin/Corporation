import { CriteriaProduct } from "../criteriaProduct";

// export interface TemplateFilter{
//     id:number,
//     title:string,
//     criteria:CriteriaProduct,
//     readonly:boolean,
//     isApplying: boolean
// }


export interface TemplateFilter{
    id:number,
    title:string,
    owner:string,
    isOwner:boolean,
    criteria:CriteriaProduct
}