import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEventPattern } from 'rxjs';
import { MovementProduct } from 'src/app/interfaces/product/MovementProductManagerPage/movementProduct';
import { MovementProductForm } from 'src/app/interfaces/product/MovementProductManagerPage/movementProductForm';

import { MovementsSignalrService } from '../signalrServices/movements-signalr.service';

@Injectable({
  providedIn: 'root'
})
export class MovementsUpdateService {

  movementsProduct$=new BehaviorSubject<number[]>([]);

  constructor(private readonly signalr:MovementsSignalrService) { 
    if (!signalr.isConnection)
      signalr.startConnection();
    this.productStorageOnLis();
  }

  moveProducts(form:MovementProductForm){
   const addedMovements = this.convertForm(form);
    
    this.signalr.hubConnection?.invoke("MoveProducts",addedMovements)
      .then()
      .catch(err=>{console.error(err)}) ;
  }
  private convertForm(form: MovementProductForm) : MovementProductForm{
    const addedMovementProducts = [] as MovementProduct[];
    form.movementProducts.forEach(movement=>{
      addedMovementProducts.push({
        productId: Number ( movement.productId),
        movedCount: Number (movement.movedCount)
      })
    })
    return {
      from:Number(form.from),
      to:Number(form.to),
      movementProducts:addedMovementProducts
    }
  }
  
  private productStorageOnLis() {
    this.signalr.hubConnection
      ?.on("changeProducts",(changedStorages:number[])=>{
        console.log("movements lis")
        this.movementsProduct$.next(changedStorages);
    })
  }
}
