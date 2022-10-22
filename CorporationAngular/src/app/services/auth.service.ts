import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '../interfaces/auth/authToken';
import { map } from 'rxjs/operators'
import { TokenData } from '../interfaces/auth/tokenData';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginForm } from '../interfaces/auth/loginForm';
import { NewUser } from '../interfaces/auth/newUser';
import { AvaiableUser } from '../interfaces/auth/avaiablesUserForm';
import { PermissionInfo } from '../interfaces/userManagerPage/permissionInfo';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private key:string = "td";

  tokenData : TokenData={
    userId:0,
    username:"",
    avaiables:[],
    department:0,
    factory:0,
    region:0
  }

  tokenData$=new BehaviorSubject<TokenData | null>(null);
  token$=new BehaviorSubject<string | null>(null);
  
  constructor(
    private readonly client:HttpClient,
    private readonly localStorage:LocalStorageService) {
      this.getDataPage();
    }

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

            this.localStorage.clear();

            this.localStorage.set(this.key, tokenData);
            return tokenData;
        })
        
      )
      
  }

  logout(){
    this.token$.next(null);
    this.tokenData$.next(null);
    this.localStorage.clear();
  }

  addUser(newUser:NewUser){
    const addUserUrl = "https://localhost:5001/api/AuthToken/registration";
    return this.client.post<Token>(addUserUrl,newUser)
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

  private readToken(token: any):TokenData {
    
    const dataPart=token.token?.split('.')[1];
      const dataJsonString=atob(dataPart);
      const dataJson=JSON.parse(dataJsonString);
      
      const idStr = dataJson["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      
      const userId = idStr ? parseInt(idStr):0;
      
      const username = dataJson["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      
      const avaiablesJson = dataJson["avaiables"];
      const department = dataJson["department"];
      const factory = dataJson["factory"];
      const region = dataJson["region"];
      
      const jsonAvaiables = JSON.parse(avaiablesJson);
      
      const avaiables = this.createAvaiables(jsonAvaiables);

      return {
        userId:userId,
        username:username,
        avaiables:avaiables,
        department:Number(department),
        factory:Number(factory),
        region:Number(region)
      }
      
  }

  private createAvaiables(jsonAvaiables:any) : AvaiableUser[]{
    let avaiables= [] as AvaiableUser [];
    let permissions = [] as PermissionInfo [];
    if (jsonAvaiables === null) return [];
    
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

  private getDataPage(){
    const data =  this.localStorage.get<TokenData>(this.key);
    if (data !==null) this.tokenData$.next(data)
  }
  
}

