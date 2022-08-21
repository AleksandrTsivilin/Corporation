import { Injectable } from '@angular/core';
import { ProductTemplateSignalrService } from '../signalrServices/product-template-signalr.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateProductTemplateService {

  constructor(private readonly signalr:ProductTemplateSignalrService) { 
    console.log("created update product template")
    if (!this.signalr.isConnection){
      console.log('connection is not ')
      this.signalr.startConnection();
    }
    else{ console.log("connection has been ")}

  }

  delete(id : number){
    this.signalr.hubConnection?.invoke("Delete",id);
  }
}
