import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryUrls, Urls } from 'src/app/enums/urls';
import { CategoryInfo } from 'src/app/interfaces/product/categoryManagerPage/categoryInfo';
//import { Category } from 'src/app/interfaces/formAddProduct';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private readonly client:HttpClient) { }

  getCategories(){
    const urlGetCategories="https://localhost:5001/api/CategoryProduct";
    return this.client.get<CategoryInfo[]>(urlGetCategories);
  }

  getById(id: number) {
    const url = Urls.CATEGORY + CategoryUrls.BY_ID;
    const params = new HttpParams().set("id",id);

    return this.client.get<CategoryInfo>(url,{params});
  }
}

