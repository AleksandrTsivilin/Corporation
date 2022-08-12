import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegionUrls, Urls } from 'src/app/enums/urls';
import { RegionInfo } from 'src/app/interfaces/location/region/regionInfo';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private readonly client:HttpClient) { }

  getRegionsByAccess(){
    const urlGetRegionsByAccess="https://localhost:5001/api/Region/ByAccess";
    return this.client.get<RegionInfo[]>(urlGetRegionsByAccess);
  }

  getById(id : number) {
    const url = Urls.REGION + RegionUrls.BY_ID;
    const params = new HttpParams().append(
      "id" , id
    )

    return this.client.get<RegionInfo>(url,{params});
  }
}
