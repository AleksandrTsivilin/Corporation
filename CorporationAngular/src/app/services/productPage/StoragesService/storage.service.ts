import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageInfo } from 'src/app/interfaces/storageInfo';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private readonly client:HttpClient) { }

  getStorageByUser(key:string){
    const urlGetStorageByUser="https://localhost:5001/api/Storage/ByUser";
    const params = new HttpParams().set("key",key);
    return this.client.get<StorageInfo>(urlGetStorageByUser,{params:params});
  }

  getStoragesByAccess(key:string){
    const urlGetStoragesByAccess="https://localhost:5001/api/Storage/ByAccess";
    const params = new HttpParams().set("key",key);
    return this.client.get<StorageInfo[]>(urlGetStoragesByAccess,{params:params});
  }
}
