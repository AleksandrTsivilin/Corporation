import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FactoryUrls, Urls } from 'src/app/enums/urls';
import { FactoryInfo } from 'src/app/interfaces/location/factory/factoryInfo';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {
 
  constructor(private readonly client:HttpClient) { }

  getFactoriesByAcces(){
    const urlGetFactoryByAccess ="https://localhost:5001/api/Factory/ByAccess";
    return this.client.get<FactoryInfo[]>(urlGetFactoryByAccess);
  }

  getFactoryByRegionId(id:number){
    const urlGetFactoryByRegionId="https://localhost:5001/api/Factory/ByRegionId";
    const params = new HttpParams().set("id",id);
    return this.client.get<FactoryInfo[]>(urlGetFactoryByRegionId,{params});
  }

  getById(id: number) {
    const url = Urls.FACTORY + FactoryUrls.BY_ID;
    const params = new HttpParams().set(
      "id",id
    )

    return this.client.get<FactoryInfo>(url,{params})
  }

}
