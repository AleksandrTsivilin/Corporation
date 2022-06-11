import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private readonly router:Router) {}

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
