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
  getCount(){
    const urlGetCount="https://localhost:5001/api/Storage/count";
    return this.client.get<number>(urlGetCount);
  }

  getStoragesByFactoryId(id:number){
    const urlGetStoragesByFactoryId="https://localhost:5001/api/Storage/ByFactoryId";
    const params = new HttpParams().set("id",id);
    return this.client.get<StorageInfo[]>(urlGetStoragesByFactoryId,{params})
  }

  getStorageByRegionId(id:number){
    const urlGetStorageByRegionId="https://localhost:5001/api/Storage/ByRegionId";
    const params = new HttpParams().set("id",id);
    return this.client.get<StorageInfo[]>(urlGetStorageByRegionId,{params});

  }
}
