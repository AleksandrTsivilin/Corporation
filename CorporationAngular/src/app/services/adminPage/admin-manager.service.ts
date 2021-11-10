import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminManagerService {

  constructor() { }

  getPermissions(userId:number){
    console.log("getPermissions");
  }
}
