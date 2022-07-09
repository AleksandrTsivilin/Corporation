import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tab, TabRouter } from '../interfaces/roleselector/tab';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  addedTab = new BehaviorSubject<TabRouter | null>(null);
  
  constructor(private readonly authService:AuthService) {
    authService.token$.subscribe(token=>{
      if (token===null) this.addedTab.next(null);
    })
  }
}
