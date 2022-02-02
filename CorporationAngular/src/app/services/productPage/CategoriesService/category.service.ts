import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}

