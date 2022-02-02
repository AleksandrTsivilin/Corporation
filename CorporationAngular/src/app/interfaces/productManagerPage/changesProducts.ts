import { ProductInfo } from "../product/productsInfo";

export interface ProductStorageChanges{
    storage:string,
    movedProducts:ProductInfo[]
}