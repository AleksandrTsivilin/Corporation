import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { ServicePageKeys } from '../enums/servicePage/servicePageKeys';
import { TabRouter } from '../interfaces/roleselector/tab';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class TabService {

  tabs$ = new BehaviorSubject<TabRouter []> ([]);
  removedTab$ = new Subject <TabRouter > ();
  
  constructor(
    private readonly authService:AuthService,
    private readonly router:Router,
    private readonly localStorage:LocalStorageService
    ) {

      this.tokenDataSubscribe();    
      this.loadData();
  }  

  addedTab(newTab:TabRouter){
    console.log("addedTab")
    console.log(newTab)
    if (this.isHasTab(newTab)) {
      this.update(newTab);
      return;
    }

    const tabs = this.tabs$.value;
    tabs.push(newTab);
    this.tabs$.next(tabs);
    this.saveData();
  }

  remove(title:string){

    const tabs = this.tabs$.value;

    const index = tabs.findIndex(tab=>tab.title === title);

    this.removedTab$.next(tabs[index]);

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

    this.saveData();
    
  }

  private tokenDataSubscribe(){
    this.authService.tokenData$.subscribe(tokenData=>{
      if (tokenData===null) {
        this.localStorage.clear();
        this.tabs$.next([]);
      }
    })
  }

  private isHasTab(tab:TabRouter):boolean{
    return this.tabs$.value
      .map(tab=>tab.title)
      .includes(tab.title);
  }

  private update(newTab:TabRouter){
    const tabs = this.tabs$.value;
    const index = tabs.findIndex(tab=> tab.title === newTab.title);
    tabs[index] = newTab;
    this.saveData();
  }

  private saveData(){
    this.localStorage.set(ServicePageKeys.TABS,this.tabs$.value)
  }

  private loadData(){
    const tabs = this.localStorage.get<TabRouter[]>(ServicePageKeys.TABS);
    if (tabs) this.tabs$.next(tabs);
  }
}
