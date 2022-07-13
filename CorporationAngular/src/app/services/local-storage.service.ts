import { Injectable } from '@angular/core';
import { PageState } from '../interfaces/pageState';
import { ProductsPageState } from '../interfaces/product/productsPageState';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService  {
  

  pageState:PageState={
    path:"aaa",
    isActive:true
  }

  constructor(private readonly authService:AuthService) {
    authService.token$.subscribe(token=>{
      if (token === null) localStorage.clear();
    })
  }

  remove(title: string) {
    localStorage.removeItem(title);
  }

  setSettingsProductsPage(pageState:ProductsPageState){

    
    const stateStr = JSON.stringify(pageState);
    localStorage.setItem('products', stateStr);
  }

  getSettingsProductsPage():ProductsPageState | null{
    const stateStr = localStorage.getItem('products');
    
    if ( stateStr === null) return null;

    const stateJson = JSON.parse(stateStr);

    return {
      innerRouter:stateJson['innerRouter']
    }
  }
  

  clear(){
    console.log("localStorage clear")
    localStorage.clear();
  }
}
