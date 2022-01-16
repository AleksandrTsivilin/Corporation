import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleInfo } from 'src/app/interfaces/userManagerPage/roleInfo';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private readonly client:HttpClient) { }
  getRoles(){
    const urlGetRoles="https://localhost:5001/api/Role/role";
    return this.client.get<RoleInfo[]>(urlGetRoles);
  }
}
