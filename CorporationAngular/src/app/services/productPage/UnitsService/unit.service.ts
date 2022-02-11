import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
