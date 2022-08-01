import { TemplateFilter } from "./templateFilter";

// it will be unnecessary interface
export interface ProductsPageState{
    [x: string]: any;
    edit_id:number,
    table_open:boolean
}

export interface EditProductPageState{
    edit_id : number
}

export interface TableProductsPageState{
    template : TemplateFilter,
    searchString : string,
    isOrdered : boolean,
    sortCriteria : string,
    ascDirection : number
}

