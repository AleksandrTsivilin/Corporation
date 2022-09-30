import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductTemplates, Urls } from 'src/app/enums/urls';
import { NewTemplateFilter } from 'src/app/interfaces/product/newTemplateFilter';
import { TemplateFilter } from 'src/app/interfaces/product/tempalte/templateFilter';
import { TemplateFilterWithDetails } from 'src/app/interfaces/product/tempalte/templateFilterWithDetails';

@Injectable({
  providedIn: 'root'
})
export class ProductTemplateService {

  current$ = new BehaviorSubject<number | null | undefined>(null);
  
  constructor(private readonly client:HttpClient ) {}

  getByUser(){
    const url = Urls.PRODUCT_TEMPLATES + ProductTemplates.BY_USER;
    return this.client.get<TemplateFilter[]>(url);
  }

  add(newTemplate:NewTemplateFilter){
    const url = Urls.PRODUCT_TEMPLATES + ProductTemplates.ADD;

    return this.client.post<number>(url,newTemplate)
    .pipe( map(id=>{
        console.log(id);
        if (id) this.current$.next(id);
      })
    );
  }

  getStartWith(title:string){
    const url = Urls.PRODUCT_TEMPLATES + ProductTemplates.START_WITH
    const params = new HttpParams().set("title",title);
    return this.client.get<TemplateFilter[]>(url,{params});
  }

  getById(id : number) {
    const url = Urls.PRODUCT_TEMPLATES + ProductTemplates.BY_ID;
    const params = new HttpParams().set("id",id);
    return this.client.get<TemplateFilter>(url,{params});
  }

  getDetails(id : number){
    const url = Urls.PRODUCT_TEMPLATES + ProductTemplates.DETAIL;

    const params = new HttpParams().set("id",id);
    return this.client.get<TemplateFilterWithDetails>(url,{params});
  }

}
