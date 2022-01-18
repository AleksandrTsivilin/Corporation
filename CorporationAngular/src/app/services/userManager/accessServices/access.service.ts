import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessInfo } from 'src/app/interfaces/userManagerPage/accessInfo';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(private readonly client:HttpClient) { }

  getAccesses(){
    const urlGetAccesses="https://localhost:5001/api/Access/access";
    return this.client.get<AccessInfo[]>(urlGetAccesses);
  }
}
