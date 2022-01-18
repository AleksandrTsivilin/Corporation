import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PermissionInfo } from 'src/app/interfaces/userManagerPage/permissionInfo';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private readonly client:HttpClient) { }
  getPermissions(){
    const urlGetPermissions="https://localhost:5001/api/Permission/permission";
    return this.client.get<PermissionInfo[]>(urlGetPermissions);
  }
}
