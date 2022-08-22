import { not } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export interface NotificationInfo{
  code:CodeNotification,
  message:string,
  type:TypeNotification
}

export enum CodeNotification{
  CONNECTION_RESTORED,
  DISCONNECT
}

export enum TypeNotification{
  SUCCESS,
  ERROR
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor(private readonly toastr:ToastrService) { }

  registration(notification : NotificationInfo){
    this.show(notification);
  }

  private show(notification:NotificationInfo){
    switch (notification.type){
      case TypeNotification.SUCCESS : {
        this.toastr.success(notification.message);break;
      }
      case TypeNotification.ERROR : {
        this.toastr.error(notification.message);break;
      }
    }
  }
}
