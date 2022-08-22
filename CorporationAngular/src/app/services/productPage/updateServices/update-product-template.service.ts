import { Injectable } from '@angular/core';
import { ProductTemplateSignalrService } from '../signalrServices/product-template-signalr.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateProductTemplateService {

  constructor(private readonly signalr:ProductTemplateSignalrService) { 
    console.log("created update product template")
    console.log(this.signalr.hubConnection?.state)
    if (!this.signalr.hubConnection?.state){
      console.log('connection is not ')
      this.signalr.startConnection();
    }
    else{ console.log("connection has been ")}

    console.log(this.signalr.hubConnection?.state)

  }

  delete(id : number){
    this.signalr.hubConnection?.invoke("Delete",id);
  }

  // stop(){
  //   this.signalr.hubConnection?.stop();
  // }

  // start(){
  //   if (!this.signalr.hubConnection?.state){
  //     this.signalr.startConnection();
  //   }
  // }
}
