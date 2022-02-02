import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ManufacturerInfo } from 'src/app/interfaces/product/manufacturerManagerPage/manufacturerInfo';
//import { Manufacturer } from 'src/app/interfaces/formAddProduct';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private readonly client:HttpClient) { }

  getManufacturers(){
    const urlGetManufacturers="https://localhost:5001/api/Manufacturer/manufacturer";
    return this.client.get<ManufacturerInfo[]>(urlGetManufacturers);
  }
}
