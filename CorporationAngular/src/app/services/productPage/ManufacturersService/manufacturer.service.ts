import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ManufacturerInfo } from 'src/app/interfaces/product/manufacturerManagerPage/manufacturerInfo';
import { ManufacturerUrls, Urls } from 'src/app/enums/urls';


@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private readonly client:HttpClient) { }

  getManufacturers(){
    const urlGetManufacturers="https://localhost:5001/api/Manufacturer";
    return this.client.get<ManufacturerInfo[]>(urlGetManufacturers);
  }

  getById(id : number){
    const url = Urls.MANUFACTURER + ManufacturerUrls.BY_ID;
    const params = new HttpParams().set("id",id);
    return this.client.get<ManufacturerInfo>(url,{params});
  }
}
