import { Injectable } from '@angular/core';
import { ProductsPageState } from '../interfaces/product/productsPageState';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService  {
  

  constructor() {  }

  remove(title: string) {
    localStorage.removeItem(title);
  }

  set(key:string, value:object){

    const valueStr = JSON.stringify(value);
    localStorage.setItem(key,valueStr);
  }

  get<T> (key:string) : T | null {
    const objStr = localStorage.getItem(key);
    
    return objStr === null 
      ? null
      : JSON.parse(objStr);
  }

  // Attention it is deprecate methods. Use set and get
  setSettingsProductsPage(pageState:ProductsPageState){

    
    const stateStr = JSON.stringify(pageState);
    localStorage.setItem('products', stateStr);
  }


  // Attention it is deprecate methods. Use set and get
  getSettingsProductsPage():ProductsPageState | null{
    const stateStr = localStorage.getItem('products');
    
    if ( stateStr === null) return null;

    const stateJson = JSON.parse(stateStr);

    return {
      innerRouter:stateJson['innerRouter']
    }
  }
  

  clear(){
    localStorage.clear();
  }
}
