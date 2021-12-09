import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr'; 
import { Category, FormAddProduct, Manufacturer, Unit } from 'src/app/interfaces/formAddProduct';
//import { FormMoveProducts } from 'src/app/interfaces/formMoveProduct';

@Injectable({
  providedIn: 'root'
})
export class SignalrProductService {

  hubConnection:signalR.HubConnection | undefined

  startConnection=()=>{
    console.log("startConnection signalrService")
    this.hubConnection=new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/toastr',
      {
        skipNegotiation:true,
        transport:signalR.HttpTransportType.WebSockets
      }).build();

      this.hubConnection
        .start()
        .then(()=>{ 
          console.log("hubConnection signalrService")
          //this.ssSubj.next({type:"HubConnStarted"}); 
        })
        .catch(err=>{console.log("some errors")})
  }
  constructor() { console.log ("constr signal")}

  

  async addProduct(formAddProduct:FormAddProduct){
    console.log(formAddProduct)
    console.log("addProduct")

    let addedProduct ={
      price:Number(formAddProduct.price),
      avaiableCount:Number(formAddProduct.avaiableCount),
      title:formAddProduct.title,
      manufacturer:formAddProduct.manufacturer,
      category:formAddProduct.category,
      unit:formAddProduct.unit
    }
    
    await this.hubConnection?.invoke("AddProduct",addedProduct)
      .then()
      .catch(err=>{console.error(err)})
  }
}
