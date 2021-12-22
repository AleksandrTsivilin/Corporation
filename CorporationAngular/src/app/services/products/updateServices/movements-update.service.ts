import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormMoveProducts, MovementsProduct } from 'src/app/interfaces/formMoveProduct';
import { MovementsSignalrService } from '../signalrServices/movements-signalr.service';

@Injectable({
  providedIn: 'root'
})
export class MovementsUpdateService {

  movementsProduct$=new BehaviorSubject<MovementsProduct []>([]);

  constructor(private readonly signalr:MovementsSignalrService) { 
    if (!signalr.isConnection)
      signalr.startConnection();
    this.productStorageOnLis();
  }

  moveProducts(form:FormMoveProducts){
   
    console.log("moveProduct moveUpdateService")
    const movedProducts={
      from:form.from,
      to:form.to,
      movedProducts:form.movedProducts
        .filter(p=>p.isChecked)
        .map(p=>({id:p.id, countMoved:Number(p.countMoved)}))
    }
    
    this.signalr.hubConnection?.invoke("MoveProducts",movedProducts)
      .then()
      .catch(err=>{console.error(err)}) ;
  }
  
  private productStorageOnLis() {
    this.signalr.hubConnection
      ?.on("movementsProduct",(movements:MovementsProduct[])=>{
        this.movementsProduct$.next(movements);
    })
  }
}
