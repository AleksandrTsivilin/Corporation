import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductTemplates, Urls } from 'src/app/enums/urls';
import { NewTemplateFilter } from 'src/app/interfaces/product/newTemplateFilter';
import { TemplateFilter } from 'src/app/interfaces/product/templateFilter';

@Injectable({
  providedIn: 'root'
})
export class ProductTemplateService {

  constructor(private readonly client:HttpClient ) { }

  getByUser(){
    const urlGetByUser = "https://localhost:5001/api/ProductTemplates/byUser";
    return this.client.get<TemplateFilter[]>(urlGetByUser);
  }

  add(newTemplate:NewTemplateFilter){
    const url = "";
    //const params = new HttpParams().set();

  }

  getStartWith(title:string){
    const url = Urls.PRODUCT_TEMPLATES + ProductTemplates.START_WITH
    const params = new HttpParams().set("title",title);
    return this.client.get<TemplateFilter[]>(url,{params});
  }
}
