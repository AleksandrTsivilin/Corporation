import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr'; 
@Injectable({
  providedIn: 'root'
})
export class MovementsSignalrService {

  hubConnection:signalR.HubConnection | undefined
  isConnection:boolean=false;

  startConnection=()=>{
    console.log("startConnection movements signalr")
    this.hubConnection=new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/movementsHub',
      {
        skipNegotiation:true,
        transport:signalR.HttpTransportType.WebSockets
      }).build();

      this.hubConnection
        .start()
        .then(()=>{ 
          this.isConnection=true;
        })
        .catch(err=>{console.log("movements signalr service")})
  }
}
