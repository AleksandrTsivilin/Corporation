import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { HubUrls } from 'src/app/enums/hubUrls';
import { CodeNotification, NotificationService, TypeNotification } from '../../notification.service';

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
          console.log("hubConnection product template")
          
          //this.ssSubj.next({type: "HubConnStarted"});
          //
          //this.isConnection=true;
          
          //
          //this.askServerListener();
          //this.askServer();
        })
        .catch(err=>{
          console.log("some errors")
          debugger;
        })

      this.hubConnection
        .onreconnected(_=> {
          this.notify.registration({
            code:CodeNotification.CONNECTION_RESTORED,
            message:"connection has been restored",
            type: TypeNotification.SUCCESS
          })
        })


      this.hubConnection.onreconnecting(_=>{
        this.notify.registration({
          code:CodeNotification.DISCONNECT,
          message:"you are offline",
          type:TypeNotification.ERROR
        })
      })
        
  }
  
  constructor(private readonly notify : NotificationService ) { 
    
  }
}


