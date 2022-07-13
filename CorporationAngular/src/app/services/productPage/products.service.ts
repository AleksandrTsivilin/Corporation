import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import { CategoryInfo } from 'src/app/interfaces/product/categoryManagerPage/categoryInfo';
import { ManufacturerInfo } from 'src/app/interfaces/product/manufacturerManagerPage/manufacturerInfo';
import { FilterProductForm, ProductFilterForm } from 'src/app/interfaces/product/productFilterForm';
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

  // getStorageByUser(userId:number){
  //   console.log("getStorageByUser")
  //   const urlGetStorageByUser="https://localhost:5001/api/Product/storageByUser";
  //   let params=new HttpParams();
  //   params.append("userId",userId);
  //   return this.client.get<StorageInfo>(urlGetStorageByUser,{params})
  // }
  getByFilter(filter:FilterProductForm){
    const urlGetByFilter="https://localhost:5001/api/Product/ByFilter";
    var formData= new FormData();
    formData.append("Title",filter.searchString)
    formData.append("regionId",filter.criteria.regionId?.toString());
    formData.append("factoryId",filter.criteria.factoryId?.toString());
    formData.append("storageId",filter.criteria.storageId?.toString());
    formData.append("manufacturerId",filter.criteria.manufacturerId?.toString());
    formData.append("categoryId",filter.criteria.categoryId?.toString());
    formData.append("unitId",filter.criteria.unitId?.toString());
    formData.append("startPrice",filter.criteria.startPrice.toString());
    formData.append("endPrice",filter.criteria.endPrice.toString());
    formData.append("startCount",filter.criteria.startCount.toString());
    formData.append("endCount",filter.criteria.endCount.toString());
    console.log(filter)
    return this.client.post<ProductInfo[]>(urlGetByFilter,formData)
  }

  getByFilterByTitle(title:string){
    console.log(title)
    const urlGetFilterByTitle = "https://localhost:5001/api/Product/filterByTitle"
    let params = new HttpParams().set("title",title);
    console.log(params.get("title"))
    return this.client.get<ProductInfo[]>(urlGetFilterByTitle,{params});
  }
  
}
