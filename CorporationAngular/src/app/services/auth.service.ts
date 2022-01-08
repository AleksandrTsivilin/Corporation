import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '../interfaces/auth/authToken';
import { RegistrationForm } from '../interfaces/registrationForm';
import {map, tap} from 'rxjs/operators'
import { TokenData } from '../interfaces/auth/tokenData';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenData : TokenData={
    userId:0,
    fullname:"",
    roles:[]
  }
  tokenData$=new BehaviorSubject<TokenData | null>(null);
  token$=new BehaviorSubject<Token | null>(null);
  constructor(private readonly client:HttpClient) { }

  login(registrationForm:RegistrationForm):Observable<TokenData>{
    const urlLogin = "https://localhost:5001/api/AuthToken";
   
    return this.client
      .post<Token>(urlLogin,registrationForm)
      .pipe(
        tap(_=>console.log(_)),
        map(t=>
          {
            this.token$.next(t);
            const tokenData= this.readToken(t);
            this.tokenData$.next(tokenData);
            return tokenData;
        })
        
      )
      // .pipe(
      //   tap(t=>this.token$.next(t.token)),
      //   map(t=>{
      //     const tokenData=this.readToken(t);
      //     this.tokenData$.next(this.readToken(t));
      //     return tokenData;
      //   })
        
      // );
  }

  private readToken(token: any):TokenData {
    const dataPart=token.token?.split('.')[1];
      const dataJsonString=atob(dataPart);
      
      const dataJson=JSON.parse(dataJsonString);
      
      const idStr = dataJson["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      
      const userId = idStr ? parseInt(idStr):0;
  
      const fullname = dataJson["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      
      const rolesString = dataJson["roles"];
  
      const roles = JSON.parse(rolesString);
      
      return {
        userId:userId,
        fullname:fullname,
        roles:roles
      }
  }
  
}

