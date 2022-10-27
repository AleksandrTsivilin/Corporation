import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from "@microsoft/signalr";
import { HubUrls } from 'src/app/enums/hubUrls';
import { Routers } from 'src/app/enums/routers/routers';
import { NotificationService } from '../../notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProductTemplateSignalrService {

  hubConnection:signalR.HubConnection | undefined;  

  startConnection=()=>{

    this.hubConnection=new signalR.HubConnectionBuilder()
      .withUrl(HubUrls.PRODUCT_TEMPLATES, 
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
        .catch(err=>{
          this.router.navigate([Routers.RESPONCES])
        })

      this.hubConnection
        .onreconnected(_=> {
          this.notify.success(
            "connection has been restored",
            "connection manager"
          )
        })


      this.hubConnection.onreconnecting(_=>{
        this.notify.error(
          "you are offline",
          "connection manager"
        );console.log("onreconnecting")
      })
        
  }
  
  constructor(
    private readonly notify:NotificationService,
    private readonly router:Router) { 
    console.log("constructor product template signal")
  }

  
}


