import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModeMainPageService, PageSizes } from 'src/app/services/modeMainPage/mode-main-page.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {


  //isFullScreen:boolean=false;
  
  pageSizes=PageSizes;
  isLogin:boolean=false;
  activeNav:string="";

  constructor(
    private readonly modePageService:ModeMainPageService,
    private readonly authService:AuthService,
    private readonly location:Location
  ) { }

  ngOnInit(): void {

    this.authService.token$.subscribe(result=>{
      this.isLogin = result === null
        ? false
        : true; 
                 
    })

    this.modePageService.currentRouter$.subscribe(link=>{
      this.activeNav=link;
    })
    // this.modePageService.pageSize$.subscribe((mode)=>{
    //   //this.isFullScreen=this.modePageService.isFullScreen;
    //   //this.isFullScreen = mode===this.pageSizes.SHORT;
    // })
  }

  // onFullScreen(){
  //   this.modePageService.onFullScreen();
  // }

  changeModePage(mode:number){
    this.modePageService.pageSize$.next(mode);
  }

  toLogout(){
    this.authService.token$.next(null);
    this.changeModePage(this.pageSizes.LONG);
  }
  // toMoveMain(){
  //   this.modePageService.moveToMain();
  // }

  // toMoveLoginForm(){
  //   this.modePageService.moveToLogin();
  // }

}
