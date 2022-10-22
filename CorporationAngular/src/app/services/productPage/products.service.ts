import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Urls } from 'src/app/enums/urls';
import { FilterProductForm, ProductFilterForm } from 'src/app/interfaces/product/productFilterForm';
import { ProductInfo } from 'src/app/interfaces/product/productsInfo';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  urls = Urls;
  constructor(private readonly client:HttpClient) { }

  getProductsByAccess(){
    const urlGetProducts=this.urls.PRODUCT_BY_ACCESS;
    return this.client.get<ProductInfo[]>(urlGetProducts);
  }

  getProductsByUser(){
    const urlGetProducts=this.urls.PRODUCT_BY_USER;
    return this.client.get<ProductInfo[]>(urlGetProducts);
  }


  getByFilter(filter:FilterProductForm){
    const urlGetByFilter=this.urls.PRODUCT_BY_FILTER;
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
    return this.client.post<ProductInfo[]>(urlGetByFilter,formData)
  }

  getByFilterByTitle(title:string){
    const urlGetFilterByTitle = "https://localhost:5001/api/Product/filterByTitle"
    let params = new HttpParams().set("title",title);
    return this.client.get<ProductInfo[]>(urlGetFilterByTitle,{params});
  }

  getById(id:number){
    const urlGetById="https://localhost:5001/api/Product/ById";
    let params = new HttpParams().set("id", id)
    return this.client.get<ProductInfo>(urlGetById,{params});
  }
  
}
