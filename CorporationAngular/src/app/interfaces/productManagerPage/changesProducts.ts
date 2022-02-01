import { ProductInfo } from "./productsInfo";

export interface ProductStorageChanges{
    storage:string,
    movedProducts:ProductInfo[]
}