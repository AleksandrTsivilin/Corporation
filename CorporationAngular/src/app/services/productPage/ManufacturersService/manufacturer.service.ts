import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ManufacturerInfo } from 'src/app/interfaces/product/manufacturerManagerPage/manufacturerInfo';


@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private readonly client:HttpClient) { }

  getManufacturers(){
    const urlGetManufacturers="https://localhost:5001/api/Manufacturer";
    return this.client.get<ManufacturerInfo[]>(urlGetManufacturers);
  }
}
