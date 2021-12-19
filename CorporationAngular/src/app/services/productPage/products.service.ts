import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, Manufacturer, Unit } from 'src/app/interfaces/formAddProduct';
import { ProductInfo } from 'src/app/interfaces/productsInfo';
import { StorageInfo } from 'src/app/interfaces/storageInfo';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly client:HttpClient) { }

  getProducts(){
    const urlGetProducts="https://localhost:5001/api/Product";
    return this.client.get<ProductInfo[]>(urlGetProducts);
  }

  getManufacturers(){
    const urlGetManufacturers="https://localhost:5001/api/Product/manufacturer";
    return this.client.get<Manufacturer[]>(urlGetManufacturers);
  }

  getCategories(){
    const urlGetCategories="https://localhost:5001/api/Product/category";
    return this.client.get<Category[]>(urlGetCategories);
  }

  getUnits(){
    const urlGetUnits="https://localhost:5001/api/Product/unit";
    return this.client.get<Unit []>(urlGetUnits);
  }

  getStorages(){
    const urlGetStorage="https://localhost:5001/api/Product/storage";
    return this.client.get<Storage []>(urlGetStorage);
  }

  getStorageByUser(userId:number){
    const urlGetStorageByUser="https://localhost:5001/api/Product/storageByUser";
    let params=new HttpParams();
    params.append("userId",userId)
    return this.client.get<StorageInfo>(urlGetStorageByUser,{params})
  }
}
