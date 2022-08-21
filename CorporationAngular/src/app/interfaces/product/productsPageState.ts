import { TabRouter } from "../roleselector/tab";
import { CriteriaProduct } from "./criteriaProduct";
import { TemplateFilter } from "./tempalte/templateFilter";

// it will be unnecessary interface
export interface ProductsPageState{
    [x: string]: any;
    edit_id:number,
    table_open:boolean
}


export interface ProductPageState{
    start : string
}

export interface EditProductPageState{
    edit_id : number
}

export interface TableProductsPageState{
    template : TemplateFilter,
    searchString : string,
    isOrdered : boolean,
    sortCriteria : string,
    ascDirection : number,
    isOpenDetail : boolean,
    raw:TemplateFilter
}

export interface ProductTemplatePageState{
    tabs : TabRouter [],
    prev : string,
    curr : string
}

export interface ProductNewTemplatePageState{
    raw : TemplateFilter,
    isChanged: boolean
}

export interface ProductCriteriaPageState{
    id: number,
    isChanged : boolean,
    title : string,
    criteria : CriteriaProduct
}

export interface ProductTemplatesPageState{
    search : string,
    curr: number
}

