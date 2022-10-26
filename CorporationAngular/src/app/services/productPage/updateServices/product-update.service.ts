
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NewProductForm } from 'src/app/interfaces/product/newProductForm';
import { ProductSignalrService } from '../signalrServices/product-signalr.service';

@Injectable({
  providedIn: 'root'
})
export class ProductUpdateService {

  changesProductStorage$=new BehaviorSubject<number[]>([]);
  constructor(private readonly signalr:ProductSignalrService) { 
    if (!signalr.hubConnection?.state)
      signalr.startConnection();
    this.productChangesOnLis();
  }

  addProduct(newProductForm:NewProductForm){
    
    let addedProduct = this.convertForm(newProductForm); 
    this.signalr.hubConnection?.invoke("AddProduct",addedProduct)
      .then()
      .catch(err=>{console.error(err)})
  }

  updateProduct(newProductForm:NewProductForm,id:number){
    const product=this.convertForm(newProductForm);
    this.signalr.hubConnection?.invoke("UpdateProduct",product,id)
  }

  remove(id:number){
    this.signalr.hubConnection?.invoke("DeleteProduct",id)
      .then()
      .catch(err=>console.error(err));
  }

  private productChangesOnLis() {
    this.signalr.hubConnection
      ?.on("changeProducts",(changes:number[])=>{
        this.changesProductStorage$.next(changes);
    })
  }
  private convertForm(newProductForm:NewProductForm):NewProductForm{
    return {
      storageId:newProductForm.storageId,
      title:newProductForm.title,
      price:Number(newProductForm.price),
      manufacturerId:Number (newProductForm.manufacturerId),
      categoryId:Number(newProductForm.categoryId),
      unitId:Number(newProductForm.unitId),
      count: Number (newProductForm.count)
    }
  }
  
}
