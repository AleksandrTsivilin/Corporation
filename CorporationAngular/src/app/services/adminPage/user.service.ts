import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from 'src/app/interfaces/userInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private readonly client:HttpClient) { }

  getUsers(userId:number){
    const urlGetUsers="https://localhost:5001/api/User/byAccess";
    //let params = new HttpParams().set("userId",userId);
    return this.client.get<UserInfo[]>(urlGetUsers);
  }

  update(updateUser:UserInfo){
    console.log("update service");
    const urlUpdate="https://localhost:5001/api/Admin";
    //let params = new HttpParams().set("model",updateUser)
    return this.client.put(urlUpdate,updateUser);
  }

  remove(userId:number | null){
    console.log("userService remove");
    const urlDelete="https://localhost:5001/api/Admin";
    console.log(userId)
    if (userId!==null){
      let params = new HttpParams().set("userId",userId);
      return this.client.delete(urlDelete,{params});
    }
    return null;
    
  }
}
