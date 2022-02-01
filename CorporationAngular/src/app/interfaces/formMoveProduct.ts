import { ProductInfo } from "./productManagerPage/productsInfo";

export interface FormMoveProducts{
    from:string,
    to:string,
    movedProducts:MovedProduct[]
}
 
export interface MovedProduct{
    id:number,
    title:string,
    avaiableCount:number,
    countMoved:number,
    isChecked:false,
    price:number,
    unit:string
}

export interface MovementsProduct{
    storage:string,
    products:ProductInfo[]
}

export interface ProductStorage{
    storage:string,
    movedProducts:ProductInfo[]
}