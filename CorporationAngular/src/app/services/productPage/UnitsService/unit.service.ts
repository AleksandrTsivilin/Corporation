import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnitUrls, Urls } from 'src/app/enums/urls';
import { UnitInfo } from 'src/app/interfaces/product/unitManagerPage/unitInfo';


@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private readonly client:HttpClient) { }

  getUnits(){
    const urlGetUnits="https://localhost:5001/api/UnitProduct";
    return this.client.get<UnitInfo []>(urlGetUnits);
  }

  getById(id:number){
    const url= Urls.UNIT + UnitUrls.BY_ID;
    const params = new HttpParams().set("id",id)
    return this.client.get<UnitInfo>(url,{params});
  }
}
