import { CategoryInfo } from "./categoryManagerPage/categoryInfo";
import { ManufacturerInfo } from "./manufacturerManagerPage/manufacturerInfo";
import { UnitInfo } from "./unitManagerPage/unitInfo";


export interface ProductInfo{
    [x: string]: any;
    id:number,
    title:string,
    count:number,
    price:number,
    manufacturer:ManufacturerInfo,
    category:CategoryInfo,
    unit:UnitInfo,
    isBanned:boolean
}

