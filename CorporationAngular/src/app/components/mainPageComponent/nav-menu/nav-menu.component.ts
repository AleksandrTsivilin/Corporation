import { Location } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
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
  
  //pageSizes=PageSizes;
  isLogin:boolean=false;
  isFixed:boolean=false;
  //activeNav:string="";

  
  constructor(
    //private readonly modePageService:ModeMainPageService,
    private readonly authService:AuthService,
    //private readonly location:Location
  ) { console.log("constr nav menu")}

  ngOnInit(): void {

    this.authService.token$.subscribe(result=>{
      this.isLogin = result === null
        ? false
        : true; 
                 
    })

    // this.modePageService.currentRouter$.subscribe(link=>{
    //   this.activeNav=link;
    // })
    // this.modePageService.pageSize$.subscribe((mode)=>{
    //   //this.isFullScreen=this.modePageService.isFullScreen;
    //   //this.isFullScreen = mode===this.pageSizes.SHORT;
    // })
  }

  @HostListener("document:scroll")
  scrollfunction(){
    this.isFixed = window.pageYOffset >= 10;
    //this.isHeaderShort = window.pageYOffset >= 80;
    // console.log(document.documentElement.scrollTop)
    // console.log(this.isHeaderShort)
    // if (document.documentElement.scrollTop>80 && !this.isHeaderShort){      
    //   try {
    //     console.log("to go short header")
    //     const errorField = this.renderer.selectRootElement('.anchor');
    //     errorField.scrollIntoView({          
    //       block: 'start'
    //     });
        
    //     this.isHeaderShort=true;
    //   } catch (err) {console.log("error")}

    //   console.log('scrolling end ')
      
    // }  

    // else{
      
    //   if (this.isHeaderShort && document.documentElement.scrollTop<300 && document.documentElement.scrollTop>81){
    //     console.log('to go big header')
    //     this.isHeaderShort=false;
    //     try {
    //       //console.log("to go short header")
    //       const errorField = this.renderer.selectRootElement('.anchor');
    //       errorField.scrollIntoView({          
    //         block: 'end'
    //       });
          
          
    //     } catch (err) {console.log("error")}
    //   }
    // }
    
   
      
  }  

  // onFullScreen(){
  //   this.modePageService.onFullScreen();
  // }

  // changeModePage(mode:number){
  //   this.modePageService.pageSize$.next(mode);
  // }

  toLogout(){
    this.authService.token$.next(null);
    //this.changeModePage(this.pageSizes.LONG);
  }
  // toMoveMain(){
  //   this.modePageService.moveToMain();
  // }

  // toMoveLoginForm(){
  //   this.modePageService.moveToLogin();
  // }

}
