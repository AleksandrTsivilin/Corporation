import { Injectable } from '@angular/core';
import { NewUserWithAvaiables } from 'src/app/interfaces/userManagerPage/newUserWithAvaiables';
import { UserSignalrService } from './user-signalr.service';
import { AvaiableUserForm } from 'src/app/interfaces/auth/avaiablesUserN';
@Injectable({
  providedIn: 'root'
})
export class UserUpdateService {
  //avaiables: AvaiableUserN [] = []
  constructor(private readonly signalr:UserSignalrService) {
    if (!signalr.isConnection)
      signalr.startConnection();

   }

  addUserWithAvaiables(newUser:NewUserWithAvaiables){
     const addedUser={
       employeeId:Number(newUser.employeeId),
       username:newUser.username,
       password:newUser.password,
       email:newUser.email,
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
    console.log(addedUser)
    this.signalr.hubConnection?.invoke("AddUserWithAvaiables",addedUser)
    .then()
    .catch(err=>{console.error(err)})
  }

  updateUser(avaiables:AvaiableUserForm,userId:number){
    console.log(avaiables)
    console.log(userId)
    this.signalr.hubConnection?.invoke("UpdateUserAvaiables",avaiables,userId)
      .then()
      .catch(err=>{console.error(err)})

  }
    
}
