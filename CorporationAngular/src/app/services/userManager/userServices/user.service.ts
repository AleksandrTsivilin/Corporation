import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { UserInfo } from 'src/app/interfaces/userInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private readonly client:HttpClient) { }

  getUsersByAccess(){
    const urlGetUsers="https://localhost:5001/api/User/byAccess";
    return this.client.get<UserInfo[]>(urlGetUsers)
      .pipe(
        tap(users=>users
          .map(user=>
            user.fullname=user.employee.lastname+user.employee.firstname))
      );
  }

  // update(updateUser:UserInfo){
  //   const urlUpdate="https://localhost:5001/api/Admin";
  //   return this.client.put(urlUpdate,updateUser);
  // }

  // remove(userId:number | null){
  //   const urlDelete="https://localhost:5001/api/Admin";
  //   if (userId!==null){
  //     let params = new HttpParams().set("userId",userId);
  //     return this.client.delete(urlDelete,{params});
  //   }
  //   return null;
    
  // }
}
