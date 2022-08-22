import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { ToastrService } from 'ngx-toastr';
import { HubUrls } from 'src/app/enums/hubUrls';

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
          
          this.toastr.success("connection has been restored")
        })


      this.hubConnection.onreconnecting(_=>
        this.toastr.error("you are offline"))
        
  }
  
  constructor( private readonly toastr:ToastrService) { 
    
  }
}


