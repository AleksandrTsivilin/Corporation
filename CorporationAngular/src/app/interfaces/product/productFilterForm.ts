import { CriteriaProduct } from "./criteriaProduct"

export interface ProductFilterForm{
    title:string,
    regionId:number,
    factoryId:number,
    storageId:number,
    manufacturerId:number,
    categoryId:number,
    unitId:number,
    startPrice:number,
    endPrice:number,
    startCount:number,
    endCount:number
}


export interface FilterProductForm{
    searchString:string,
    criteria:CriteriaProduct
}