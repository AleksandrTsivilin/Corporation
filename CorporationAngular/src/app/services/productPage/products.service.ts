import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Category, Manufacturer, Unit } from 'src/app/interfaces/formAddProduct';
//import { FormMoveProducts } from 'src/app/interfaces/product/MovementProductManagerPage/movementProductForm';
import { CategoryInfo } from 'src/app/interfaces/product/categoryManagerPage/categoryInfo';
import { ManufacturerInfo } from 'src/app/interfaces/product/manufacturerManagerPage/manufacturerInfo';
import { ProductInfo } from 'src/app/interfaces/product/productsInfo';
import { UnitInfo } from 'src/app/interfaces/product/unitManagerPage/unitInfo';
import { StorageInfo } from 'src/app/interfaces/storageInfo';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly client:HttpClient) { }

  getProductsByAccess(){
    const urlGetProducts="https://localhost:5001/api/Product/productsByAccess";
    return this.client.get<ProductInfo[]>(urlGetProducts);
  }

  getProductsByUser(){
    const urlGetProducts="https://localhost:5001/api/Product/ByUser";
    return this.client.get<ProductInfo[]>(urlGetProducts);
  }

  getManufacturers(){
    const urlGetManufacturers="https://localhost:5001/api/Product/manufacturer";
    return this.client.get<ManufacturerInfo[]>(urlGetManufacturers);
  }

  getCategories(){
    const urlGetCategories="https://localhost:5001/api/Product/category";
    return this.client.get<CategoryInfo[]>(urlGetCategories);
  }

  getUnits(){
    const urlGetUnits="https://localhost:5001/api/Product/unit";
    return this.client.get<UnitInfo []>(urlGetUnits);
  }

  getStorages(){
    const urlGetStorage="https://localhost:5001/api/Product/storage";
    return this.client.get<StorageInfo []>(urlGetStorage);
  }

  getStorageByUser(userId:number){
    const urlGetStorageByUser="https://localhost:5001/api/Product/storageByUser";
    let params=new HttpParams();
    params.append("userId",userId)
    return this.client.get<StorageInfo>(urlGetStorageByUser,{params})
  }
  
}
