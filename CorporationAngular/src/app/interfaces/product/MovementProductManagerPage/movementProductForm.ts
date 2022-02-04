import { StorageInfo } from "../../storageInfo";
import { ProductInfo } from "../productsInfo";
import { MovementProduct } from "./movementProduct";

export interface MovementProductForm{
    from:number,
    to:number,
    movementProducts:MovementProduct[]
    //movedProducts:MovedProduct[]
}
 
// export interface MovedProduct{
//     id:number,
//     title:string,
//     avaiableCount:number,
//     countMoved:number,
//     isChecked:false,
//     price:number,
//     unit:string
// }

// export interface MovementsProduct{
//     storage:string,
//     products:ProductInfo[]
// }

// export interface ProductStorage{
//     storage:string,
//     movedProducts:ProductInfo[]
// }