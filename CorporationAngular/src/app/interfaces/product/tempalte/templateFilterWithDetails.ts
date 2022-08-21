import { FactoryInfo } from "../../location/factory/factoryInfo";
import { RegionInfo } from "../../location/region/regionInfo";
import { StorageInfo } from "../../storageInfo";
import { CategoryInfo } from "../categoryManagerPage/categoryInfo";
import { ManufacturerInfo } from "../manufacturerManagerPage/manufacturerInfo";
import { UnitInfo } from "../unitManagerPage/unitInfo";

export interface TemplateFilterWithDetails{
    id:number,
    title:string,
    owner:string,
    isOwner:boolean,
    region:RegionInfo,
    factory:FactoryInfo,
    storage:StorageInfo,
    manufacturer:ManufacturerInfo,
    category: CategoryInfo,
    unit: UnitInfo,
    startCount: number,
    endCount:number,
    startPrice:number,
    endPrice:number
}