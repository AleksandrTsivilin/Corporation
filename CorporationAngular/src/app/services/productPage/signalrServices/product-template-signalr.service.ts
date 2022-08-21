import { Injectable } from '@angular/core';
//import * as signalR from "@microsoft/signalr";
import * as signalR from '@aspnet/signalr';
import { HubUrls } from 'src/app/enums/hubUrls';

@Injectable({
  providedIn: 'root'
})
export class ProductTemplateSignalrService {

  hubConnection:signalR.HubConnection | undefined;

  isConnection : boolean = false;


  // this.hubConnection = new signalR.HubConnectionBuilder()
  // .withUrl('https://localhost:5001/chart')
  // .withAutomaticReconnect()
  // .configureLogging(signalR.LogLevel.Information)
  // .build();

  startConnection=()=>{
    console.log("start connection product template signalr")
    // this.hubConnection=new signalR.HubConnectionBuilder()
    //   .withUrl(HubUrls.PRODUCT_TEMPLATES, 
    //   {
    //     skipNegotiation:true,
    //     transport:signalR.HttpTransportType.WebSockets        
    //   })
      
    //   .build();
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(HubUrls.PRODUCT_TEMPLATES, 
            {
              skipNegotiation:true,
              transport:signalR.HttpTransportType.WebSockets        
            })
            //.withHubProtocol()
            //.withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

      this.hubConnection
        .start()
        .then(()=>{ 
          console.log("hubConnection product template")
          this.isConnection=true;
        })
        .catch(err=>{console.log("some errors")})
  }
  constructor() { console.log("product template signalr")}
}
function withAutomaticReconnect() {
  throw new Error('Function not implemented.');
}

