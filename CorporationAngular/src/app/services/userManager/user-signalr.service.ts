import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class UserSignalrService {

  hubConnection:signalR.HubConnection | undefined
  isConnection:boolean=false;
  startConnection=()=>{
    console.log("startConnection signalrService")
    this.hubConnection=new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/userHub', 
      {
        skipNegotiation:true,
        transport:signalR.HttpTransportType.WebSockets
      }).build();

      this.hubConnection
        .start()
        .then(()=>{ 
          console.log("hubConnection signalrService")
          this.isConnection=true;
        })
        .catch(err=>{console.log("some errors")})
  }
  constructor() { }
}
