import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TemplateFilter } from 'src/app/interfaces/product/templateFilter';

@Injectable({
  providedIn: 'root'
})
export class ProductTemplateService {

  constructor(private readonly client:HttpClient ) { }

  getByUser(){
    const urlGetByUser = "https://localhost:5001/api/ProductTemplates/byUser";
    return this.client.get<TemplateFilter>(urlGetByUser);
  }
}
