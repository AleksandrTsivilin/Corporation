import { CategoryInfo } from "../CategoryManagerPage/categoryInfo";
import { ManufacturerInfo } from "../manufacturerManagerPage/manufacturerInfo";
import { UnitInfo } from "../unitManagerPage/unitInfo";


export interface ProductInfo{
    id:number,
    title:string,
    count:number,
    price:number,
    manufacturer:ManufacturerInfo,
    category:CategoryInfo,
    unit:UnitInfo,
    isBanned:boolean
}

