import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormAddProduct } from 'src/app/interfaces/formAddProduct';
//import { ProductStorage } from 'src/app/interfaces/formMoveProduct';
import { ProductStorageChanges } from 'src/app/interfaces/productManagerPage/changesProducts';
import { ProductSignalrService } from '../signalrServices/product-signalr.service';

@Injectable({
  providedIn: 'root'
})
export class ProductUpdateService {

  changesProductStorage$=new BehaviorSubject<ProductStorageChanges[]>([]);
  constructor(private readonly signalr:ProductSignalrService) { 
    if (!signalr.isConnection)
      signalr.startConnection();

      this.productChangesOnLis();
  }

  addProduct(formAddProduct:FormAddProduct){
    
    let addedProduct ={      
      storage:formAddProduct.storage,
      title:formAddProduct.title,
      price:Number(formAddProduct.price),
      avaiableCount:Number(formAddProduct.avaiableCount),
      manufacturer:formAddProduct.manufacturer,
      category:formAddProduct.category,
      unit:formAddProduct.unit
    } 
    
    this.signalr.hubConnection?.invoke("AddProduct",addedProduct)
      .then()
      .catch(err=>{console.error(err)})
  }

  remove(id:number){
    this.signalr.hubConnection?.invoke("DeleteProduct",id)
      .then()
      .catch(err=>console.error(err));
  }

  private productChangesOnLis() {
    this.signalr.hubConnection
      ?.on("changeProducts",(changes:ProductStorageChanges[])=>{
        this.changesProductStorage$.next(changes);
    })
  }
}
