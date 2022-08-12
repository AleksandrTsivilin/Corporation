import { CriteriaProduct } from "./criteriaProduct";

export interface TemplateFilter{
    id:number,
    title:string,
    criteria:CriteriaProduct,
    readonly:boolean
}