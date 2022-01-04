import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/interfaces/formAddProduct';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly client:HttpClient) { }

  getCategories(){
    const urlGetCategories="https://localhost:5001/api/CategoryProduct/category";
    return this.client.get<Category[]>(urlGetCategories);
  }
}

