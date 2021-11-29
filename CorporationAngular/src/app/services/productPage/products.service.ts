import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsInfo } from 'src/app/interfaces/productsInfo';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly client:HttpClient) { }

  getProducts(){
    const urlGetProducts="https://localhost:5001/api/Product";
    return this.client.get<ProductsInfo[]>(urlGetProducts);
  }
}
