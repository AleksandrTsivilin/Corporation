import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr'; 
import { Category, FormAddProduct, Manufacturer, Unit } from 'src/app/interfaces/formAddProduct';
//import { FormMoveProducts } from 'src/app/interfaces/formMoveProduct';

@Injectable({
  providedIn: 'root'
})
export class SignalrProductService {

  hubConnection:signalR.HubConnection | undefined
  isConnection:boolean=false;

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
          this.isConnection=true;
          //this.ssSubj.next({type:"HubConnStarted"}); 
        })
        .catch(err=>{console.log("some errors")})
  }
  constructor() { console.log ("constr signal")}

  

  addProduct(formAddProduct:FormAddProduct){
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

    
    
    this.hubConnection?.invoke("AddProduct",addedProduct)
      .then()
      .catch(err=>{console.error(err)})
  }

  updateProduct(updateProduct:FormAddProduct,id:number){
    const convertForm=this.FormProductConvert(updateProduct);
    // let updatedProductConvert={
    //   title:updateProduct.title,
    //   avaiableCount:Number(updateProduct.avaiableCount),
    //   price:Number(updateProduct.price),
    //   manufacturere:updateProduct.manufacturer,
    //   category:updateProduct.category,
    //   unit:updateProduct.unit
    // }
    console.log("convert form")
    console.log(convertForm);
    this.hubConnection?.invoke("updateProduct",convertForm,id)
      .then()
      .catch(err=>console.error(err))
  }

  private FormProductConvert(form:FormAddProduct){
    return {
      title:form.title,
      avaiableCount:Number(form.avaiableCount),
      price:Number(form.price),
      manufacturer:form.manufacturer,
      category:form.category,
      unit:form.unit
    }
  }
}
