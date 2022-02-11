import { StorageInfo } from "../../storageInfo";
import { ProductInfo } from "../productsInfo";
import { MovementProduct } from "./movementProduct";

export interface MovementProductForm{
    from:number,
    to:number,
    movementProducts:MovementProduct[]
}
 


