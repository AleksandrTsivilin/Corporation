import { Injectable } from '@angular/core';
import { ProductKeys } from '../enums/productPage/productKeys';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService  {
  
  

  constructor() {  }

  remove(key: any) {
    localStorage.removeItem(key);
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
  
  update(key:string, property:string ,  value : any ){
    const state = localStorage.getItem(key);

    if (!state) {

      this.set(key,{
        [property]:value
      })
      return;
    };
    const stateObj = JSON.parse(state);
    
    stateObj[property] = value;

    this.set(key,stateObj)
  }
  

  clear(){
    localStorage.clear();
  }
}
