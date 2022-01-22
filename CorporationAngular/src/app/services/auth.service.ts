import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '../interfaces/auth/authToken';
import {map, tap} from 'rxjs/operators'
import { Avaiable, TokenData } from '../interfaces/auth/tokenData';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginForm } from '../interfaces/auth/loginForm';
import { NewUser } from '../interfaces/auth/newUser';
import { NewUserWithRoles } from '../interfaces/userManagerPage/newUserWithRoles';
import { NewUserWithAvaiables } from '../interfaces/userManagerPage/newUserWithAvaiables';
//import { NewUserWithAvaiables } from '../interfaces/userManagerPage/newUserWithAvaiables';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenData : TokenData={
    userId:0,
    fullname:"",
    avaiables:[]
  }
  // tokenData:TokenData={
  //   userId:0
  // }
  tokenData$=new BehaviorSubject<TokenData | null>(null);
  token$=new BehaviorSubject<string | null>(null);
  constructor(private readonly client:HttpClient) { }

  login(loginForm:LoginForm):Observable<TokenData>{
    const urlLogin = "https://localhost:5001/api/AuthToken";
   
    return this.client
      .post<Token>(urlLogin,loginForm)
      .pipe(
        tap(_=>console.log(_)),
        map(t=>
          {
            console.log(t)
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

  // addUserWithRole(newUser:NewUserWithRoles){
  //   console.log(newUser)
  // }

  addUserWithAvaiables(newUser:NewUserWithAvaiables){
    console.log(newUser);
  }

  private readToken(token: any):TokenData {
    console.log("readToken")
    const dataPart=token.token?.split('.')[1];
      const dataJsonString=atob(dataPart);
      console.log(dataJsonString)
      const dataJson=JSON.parse(dataJsonString);
      
      const idStr = dataJson["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      
      const userId = idStr ? parseInt(idStr):0;
      
      const fullname = dataJson["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      
      const avaiablesJson = dataJson["avaiables"];
      const avaiables = JSON.parse(avaiablesJson);
      console.log(avaiables)
      return {
        userId:userId,
        fullname:"fullname",
        avaiables:avaiables as Avaiable[]
      }
      
  }
  
}

