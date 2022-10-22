import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class ProductSignalrService {

  hubConnection:signalR.HubConnection | undefined

  startConnection=()=>{
   
    this.hubConnection=new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/productHub', 
      {
        skipNegotiation:true,
        transport:signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect([0, 2000, 10000, 30000])
      .build();

      this.hubConnection
        .start()
        .then(()=>{ 
        })
        .catch(err=>{console.log("some errors")})
  }
  constructor() {}  
}
