import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '../interfaces/auth/authToken';
import { map } from 'rxjs/operators'
import { TokenData } from '../interfaces/auth/tokenData';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginForm } from '../interfaces/auth/loginForm';
import { NewUser } from '../interfaces/auth/newUser';
import { NewUserWithAvaiables } from '../interfaces/userManagerPage/newUserWithAvaiables';
import { AvaiableUser } from '../interfaces/auth/avaiablesUserT';
import { PermissionInfo } from '../interfaces/userManagerPage/permissionInfo';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenData : TokenData={
    userId:0,
    username:"",
    avaiables:[]
  }

  //private avaiablesUser : AvaiableUser []=[];
  //private permissions:PermissionInfo []=[];

  
  tokenData$=new BehaviorSubject<TokenData | null>(null);
  token$=new BehaviorSubject<string | null>(null);
  constructor(private readonly client:HttpClient) { }

  login(loginForm:LoginForm):Observable<TokenData>{
    const urlLogin = "https://localhost:5001/api/AuthToken";
   
    return this.client
      .post<Token>(urlLogin,loginForm)
      .pipe(
        map(t=>
          {
            this.token$.next(t.token);
            const tokenData= this.readToken(t);
            this.tokenData$.next(tokenData);
            return tokenData;
        })
        
      )
      
  }

  addUser(newUser:NewUser){
    console.log(newUser);
  }

  addUserWithAvaiables(newUser:NewUserWithAvaiables){
    console.log(newUser);
  }

  private readToken(token: any):TokenData {
    
    const dataPart=token.token?.split('.')[1];
      const dataJsonString=atob(dataPart);
      
      const dataJson=JSON.parse(dataJsonString);
      
      const idStr = dataJson["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      
      const userId = idStr ? parseInt(idStr):0;
      
      const username = dataJson["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      
      const avaiablesJson = dataJson["avaiables"];
      
      const jsonAvaiables = JSON.parse(avaiablesJson);
      const avaiables = this.createAvaiables(jsonAvaiables);
      return {
        userId:userId,
        username:username,
        avaiables:avaiables
      }
      
  }

  private createAvaiables(jsonAvaiables:any){
    let avaiables= [] as AvaiableUser [];
    let permissions = [] as PermissionInfo [];
    for(let avaiable of jsonAvaiables){
      
      for (let permission of avaiable.Permissions){
        permissions.push({
          id:permission.Id,
          title:permission.Title
        })
      }
      avaiables.push({
        role:{id:avaiable.Role.Id,title:avaiable.Role.Title},
        access:{id:avaiable.Access.Id,title:avaiable.Access.Title},
        permissions:permissions
      })
    }
    return avaiables;
  }
  
}

