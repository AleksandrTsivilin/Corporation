import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { ServicePageKeys } from '../enums/servicePage/servicePageKeys';
import { ProductTemplatePageState } from '../interfaces/product/productsPageState';
import { TabRouter } from '../interfaces/roleselector/tab';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class TabService {

  
  // prevRouter:string = "";
  // nextRouter:string = "";

  currRouter:string ="";
  prevRouter:string ="";

  tabs$ = new BehaviorSubject<TabRouter []> ([]);
  removedTab$ = new Subject <TabRouter > ();
  isNewTab:boolean = false;
  
  constructor(
    private readonly authService:AuthService,
    private readonly router:Router,
    private readonly localStorage:LocalStorageService
    ) {

      this.tokenDataSubscribe();    
      this.loadData();
  }  

  addedTab(newTab:TabRouter){

    if (this.isHasTab(newTab)) {
      this.update(newTab);
      return;
    }
    
    
    const tabs = this.tabs$.value;

    const index = tabs.findIndex(tab=>tab.router === this.prevRouter);

    this.isFoundIndex(index)
      ? tabs.splice(index+1,0,newTab)
      : tabs.push(newTab);
  
    this.tabs$.next(tabs);
    this.saveData();
  }

  remove(title:string){

    const tabs = this.tabs$.value;

    const index = tabs.findIndex(tab=>tab.title === title); 

    if (index < 0) return;

    this.removedTab$.next(tabs[index]);

    tabs.splice(index,1); console.log(tabs);

    this.tabs$.next(tabs);

    this.saveData();
    const length = tabs.length;
    

    if (length===0) {
      this.router.navigate(['/services']);
      return;
    }

    if (length===1) {
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
    this.localStorage.set(ServicePageKeys.TABS,{
      "tabs" : this.tabs$.value,
      "prev" : this.prevRouter,
      "curr" : this.currRouter
    })
  }

  private loadData(){
    const state = this.localStorage
      .get<ProductTemplatePageState>(ServicePageKeys.TABS);

    
    const tabs = state?.tabs;
    const prevRouter = state?.prev;
    const currRouter = state?.curr;
    
    tabs ? this.tabs$.next(tabs) : [];
    prevRouter ? this.prevRouter = prevRouter : "";
    currRouter ? this.currRouter = currRouter : "";
    
  }

  // private clearItem(key:any){
  //   this.localStorage.remove(key);
  // }

  private isFoundIndex(index:number):boolean{
    return index>=0;
  }

  // private getNewRouter(tabs : TabRouter [], curr : readonly number) : string{
  //   const length = tabs.length;
  //   switch (length) {
  //     case 0 : return "/services";
  //     case 1 : return tabs[0].router;
  //     case curr : tabs[length-1].router;
  //     default : tabs.[]
  //   }
  // }
}
