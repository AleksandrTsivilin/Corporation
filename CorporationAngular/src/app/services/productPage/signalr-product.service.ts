import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr'; 
import { Category, FormAddProduct, Manufacturer, Unit } from 'src/app/interfaces/formAddProduct';
import { FormMoveProducts } from 'src/app/interfaces/formMoveProduct';
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
      storage:formAddProduct.storage,
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
    this.hubConnection?.invoke("updateProduct",convertForm,id)
      .then()
      .catch(err=>console.error(err))
  }

  removeProduct(id:number){
    this.hubConnection?.invoke("DeleteProduct",id)
      .then()
      .catch(err=>console.error(err));
  }

  

  addManufacturer(manufacturer:Manufacturer){
    this.hubConnection?.invoke("AddManufacturer",manufacturer)
      .then()
      .catch(err=>{console.error(err)})
  }

  addCategory(category:Category){
    this.hubConnection?.invoke("AddCategory",category)
      .then()
      .catch(err=>{console.error(err)})
  }
  addUnit(unit:Unit){
    this.hubConnection?.invoke("AddUnit",unit)
      .then()
      .catch(err=>{console.error(err)})
  }

  moveProducts(form:FormMoveProducts){
    console.log("moveProduct in signalr")
    console.log(form.movedProducts)
    const a= form.movedProducts
    .filter(p=>p.isChecked)
    .map(p=>({id:p.id, countMoved:p.countMoved})
        
    )
    console.log(a);
    const movedProducts={
      from:form.from,
      to:form.to,
      movedProducts:form.movedProducts
        .filter(p=>p.isChecked)
        .map(p=>({id:p.id, countMoved:Number(p.countMoved)}))
    }
    console.log(movedProducts)
    this.hubConnection?.invoke("MoveProducts",movedProducts)
      .then()
      .catch(err=>{console.error(err)}) ;
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
