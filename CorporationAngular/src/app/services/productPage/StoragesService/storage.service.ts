import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageInfo } from 'src/app/interfaces/storageInfo';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private readonly client:HttpClient) { }

  getStorageByUser(){
    const urlGetStorageByUser="https://localhost:5001/api/Storage/storageByUser";
    return this.client.get<StorageInfo>(urlGetStorageByUser);
  }

  getStoragesByAccess(){
    const urlGetStoragesByAccess="https://localhost:5001/api/Storage/ByAccess";
    return this.client.get<StorageInfo[]>(urlGetStoragesByAccess);
  }
}
