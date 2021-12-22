import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MovedProduct, MovementsProduct } from '../interfaces/formMoveProduct';
import { SignalrProductService } from './productPage/signalr-product.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  
  movementsProduct$=new BehaviorSubject<MovementsProduct []>([]);
  constructor(private readonly signalrService:SignalrProductService) {
    //signalrService.startConnection();
    if (!signalrService.isConnection)
      signalrService.hubConnection?.start();
    this.productStorageOnLis();
    
   }
  productStorageOnLis() {
    this.signalrService.hubConnection
      ?.on("movementsProduct",(movements:MovementsProduct[])=>{
        console.log("on list product Storage")
        this.movementsProduct$.next(movements);
    })
  }

  // productOnRemoveLis():void{
  //   console.log("remove before")
  //   this.signalrService.hubConnection?.on("updateProduct",(id:number)=>{
  //     console.log("updateService")
  //     this.test$.next("remove product")
  //   })
  // }
}
