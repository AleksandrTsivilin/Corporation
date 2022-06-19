import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


export enum PageSizes{
  SHORT,
  MIDDLE,
  LONG
}

@Injectable({
  providedIn: 'root'
})
export class ModeMainPageService {

  //private previousMode:number=PageSizes.LONG;
  //private isFullScreen:boolean=false;
  pageSize$ = new BehaviorSubject<number>(PageSizes.LONG);
  currentRouter$ =  new BehaviorSubject<string>("");

  

  constructor(private readonly router:Router) {
    this.setDefaultSetting(this.router);
    
  }

  private setDefaultSetting(router:any){
    router.events.subscribe((event: any)=>{

      if (event instanceof NavigationEnd) {
        const router= event.url;
        this.currentRouter$.next(router) ;          
        console.log(this.currentRouter$.value);
        if (router!=='/') this.pageSize$.next(PageSizes.MIDDLE);    
      }
    })
  }

  // onFullScreen(){
  //   this.isFullScreen=!this.isFullScreen;
  //   if (this.isFullScreen){
  //     this.saveState();
  //     this.pageSize$.next(PageSizes.SHORT)
  //   }
  //   else{
  //     this.reset();
  //   }
  // }

  // moveToMain(){
  //   this.router.navigate([""]);
  //   this.pageSize$.next(PageSizes.LONG)
  // }

  // moveToLogin(){
  //   this.router.navigate(["loginForm"]);
  //   this.pageSize$.next(PageSizes.MIDDLE);
  // }
  // private saveState(){
  //   this.previousMode=this.pageSize$.value;
  // }

  // private reset(){
  //   this.pageSize$.next(this.previousMode);
  // }
}
