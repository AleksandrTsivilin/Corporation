import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
