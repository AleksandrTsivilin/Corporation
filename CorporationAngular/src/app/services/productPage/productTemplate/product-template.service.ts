import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductTemplates, Urls } from 'src/app/enums/urls';
import { NewTemplateFilter } from 'src/app/interfaces/product/newTemplateFilter';
import { TemplateFilter, TemplateFilterInfo } from 'src/app/interfaces/product/tempalte/templateFilter';
import { TemplateFilterWithDetails } from 'src/app/interfaces/product/tempalte/templateFilterWithDetails';
import { ResponceInfo } from 'src/app/interfaces/responceInfo/responceInfo';
import { NotificationService } from '../../notification.service';
import { ProductTitlePage } from 'src/app/enums/productPage/productTitlePage';

@Injectable({
  providedIn: 'root'
})
export class ProductTemplateService {
  

  current$ = new BehaviorSubject<number | null | undefined>(null);
  
  constructor(
    private readonly client:HttpClient,
    private readonly notify:NotificationService ) {}

  getByUser(){
    const url = Urls.PRODUCT_TEMPLATES + ProductTemplates.BY_USER;
    return this.client.get<TemplateFilter[]>(url);
  }

  add(newTemplate:NewTemplateFilter){
    const url = Urls.PRODUCT_TEMPLATES + ProductTemplates.ADD;

    return this.client.post<ResponceInfo>(url,newTemplate)
    .pipe( map(responce=>{
        const templateId = responce.data;
        if (templateId) {
          this.current$.next(templateId);
          this.notify.success(responce.message,ProductTitlePage.TEMPLATES);
        }
        else {
          this.notify.error(responce.message, ProductTitlePage.TEMPLATES);
        }
        return responce;
      })
    );
  }

  getStartWith(title:string){
    const url = Urls.PRODUCT_TEMPLATES + ProductTemplates.START_WITH
    const params = new HttpParams().set("title",title);
    return this.client.get<TemplateFilter[]>(url,{params});
  }

  // getById(id : number) {
  //   const url = Urls.PRODUCT_TEMPLATES + ProductTemplates.BY_ID;
  //   const params = new HttpParams().set("id",id);
  //   return this.client.get<TemplateFilter>(url,{params});
  // }

  getByIdWithUsers(id : number){
    const url = this.urlBuilder(ProductTemplates.BY_ID_WITH_USERS);
    const params = new HttpParams().set("id",id);
    return this.client.get<TemplateFilterInfo>(url,{params});
    // return this.client.get<TemplateFilter>(url,{params});
  }

  getDetails(id : number){
    const url = Urls.PRODUCT_TEMPLATES + ProductTemplates.DETAIL;

    const params = new HttpParams().set("id",id);
    return this.client.get<TemplateFilterWithDetails>(url,{params});
  }

  addUser(id: number) {
    throw new Error('Method not implemented.');
  }

  private urlBuilder(relativeUrl : string) : string {
    return Urls.PRODUCT_TEMPLATES + relativeUrl;
  }

}
