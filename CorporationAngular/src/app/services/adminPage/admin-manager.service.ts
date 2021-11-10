import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AdminManagerService {

  
  constructor(private readonly client:HttpClient) { }

  getPermissions(userId:number){
    console.log("getPermissions");
    const urlGetPermissions="https://localhost:5001/api/Admin/permissions";
    let params= new HttpParams().set("userId",userId);
    return this.client.get<string[]>(urlGetPermissions,{params})
  }
}
