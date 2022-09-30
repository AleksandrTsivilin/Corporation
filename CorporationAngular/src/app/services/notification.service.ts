import { Injectable } from '@angular/core';
import { IndividualConfig, Toast, ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private config : IndividualConfig = {
    disableTimeOut: false,
    timeOut: 5000,
    closeButton: true,
    extendedTimeOut: 1000,
    progressBar: false,
    progressAnimation: "decreasing",
    enableHtml: false,
    toastClass: "ngx-toastr",
    positionClass:"toast-top-right",
    titleClass:"",
    messageClass: "",
    easing:"ease-in",
    easeTime: "300",
    tapToDismiss: true,
    toastComponent: Toast,
    onActivateTick: false,
    newestOnTop: true,
    payload: null
  }
  constructor(private readonly toastr : ToastrService) { }

  success(message:string, sender : string){
    this.toastr.success(
      message,
      sender,
      this.config
    )
  }

  info(message:string, sender : string){
    this.toastr.info(
      message,
      sender,
      this.config
    )
  }

  error(message:string, sender : string){
    this.toastr.error(
      message,
      sender,
      this.config
    )
  }
  
}
