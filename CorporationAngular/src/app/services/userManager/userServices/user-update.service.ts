import { Injectable } from '@angular/core';
import { NewUserWithAvaiables } from 'src/app/interfaces/userManagerPage/newUserWithAvaiables';
import { UserSignalrService } from './user-signalr.service';
import { AvaiableUserForm } from 'src/app/interfaces/auth/avaiablesUserN';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserUpdateService {

  changesDepartmentUser$ = new BehaviorSubject<number>(0);
  constructor(private readonly signalr:UserSignalrService) {
    if (!signalr.isConnection)
      signalr.startConnection();
    this.departmentUserOnLis();
   }

  addUserWithAvaiables(newUser:NewUserWithAvaiables){
     const addedUser={
       employeeId:Number(newUser.employeeId),
       username:newUser.username,
       password:newUser.password,
       avaiables:[] as AvaiableUserForm []
     }
     
     let avaiables: AvaiableUserForm [] = [];
     for (let avaiable of newUser.avaiables){
       let permissions=[] as Number[];
       for (let permission of avaiable.permissionsId){
         permissions.push(Number(permission));
       }
       avaiables.push({
         roleId:Number(avaiable.roleId),
         accessId:Number ( avaiable.accessId),
         permissionsId: permissions as number[]
       })
     }

    addedUser.avaiables=avaiables;
    this.signalr.hubConnection?.invoke("AddUserWithAvaiables",addedUser)
    .then()
    .catch(err=>{console.error(err)})
  }

  updateUser(avaiables:AvaiableUserForm,userId:number){
    this.signalr.hubConnection?.invoke("UpdateUserAvaiables",avaiables,userId)
      .then()
      .catch(err=>{console.error(err)})

  }

  banUser(userId:number){
    this.signalr.hubConnection
      ?.invoke("BanUser",userId);
  }
  addedUser(departmentId:number){
    this.signalr.hubConnection?.invoke("AddUser",departmentId);
  }
  departmentUserOnLis(){
    this.signalr.hubConnection
      ?.on("newUser",(departmentId:number)=>{
        this.changesDepartmentUser$.next(departmentId);
      })
  }
    
}
