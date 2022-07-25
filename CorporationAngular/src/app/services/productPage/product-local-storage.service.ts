import { Injectable } from '@angular/core';
import { ProductsPageState } from 'src/app/interfaces/product/productsPageState';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductLocalStorageService {

  private pageState:ProductsPageState={
    innerRouter:"",
    edit_id:0
  }

  constructor(private readonly localStorage:LocalStorageService) { 
    this.loadData();
  }

  

  get(key:string){
    const pageState = this.localStorage.get<ProductsPageState>("pt");

    return pageState
      ? pageState[key]
      : null;
  }

 
  set(key:string, value: any){
    this.pageState[key] = value;
    
    this.localStorage.set("pt", this.pageState);

  }


  private loadData(){
    const start =  this.localStorage.get<ProductsPageState>("pt");

    if ( start ) this.pageState = start;
  }
}
