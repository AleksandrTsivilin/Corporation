import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TabRouter } from '../interfaces/roleselector/tab';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class TabService {

  tabs$ = new BehaviorSubject<TabRouter []> ([]);
  
  constructor(private readonly authService:AuthService,
    private readonly router:Router,
    private readonly localStorage:LocalStorageService) {

      this.tokenSubscribe();    
  }  

  addedTab(newTab:TabRouter){

    if (this.isHasTab(newTab)) return;

    const tabs = this.tabs$.value;
    tabs.push(newTab);
    this.tabs$.next(tabs);
  }

  remove(index:number){

    const tabs = this.tabs$.value;

    const removedTab = tabs[index]

    this.clearByItem(removedTab);

    tabs.splice(index,1);    
    const length = tabs.length;

    if (length===0) {
      this.router.navigate(['/services']);
      return;
    }

    if (length===1){
      const nextRouter = tabs[0].router;
      this.router.navigate([nextRouter]);
      return;
    }

    if (index === length){
      const nextRouter = tabs[index-1].router;
      this.router.navigate([nextRouter]);
    }
    else{
      const nextRouter = tabs[index].router;
      this.router.navigate([nextRouter]);
    }
    
  }

  private tokenSubscribe(){
    this.authService.token$.subscribe(token=>{
      if (token===null) {
        this.tabs$.value
          .map(item=>this.clearByItem(item));
        
        this.tabs$.next([]);
      }
    })
  }

  private isHasTab(tab:TabRouter):boolean{
    return this.tabs$.value
      .map(tab=>tab.title)
      .includes(tab.title);
  }

  private clearByItem(item:TabRouter){
    this.localStorage.remove(item.title);
  }
}
