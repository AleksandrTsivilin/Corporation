import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModeMainPageService, PageSizes } from 'src/app/services/modeMainPage/mode-main-page.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {

  //@Output() close=new EventEmitter();

  //@Input() isOpened:boolean=false;
  //currentPageSize:number=PageSizes.LONG;
  //isFullScreen:boolean=false;
  //pageSizes=PageSizes;
  isLogin:boolean=false;
  isOpened:boolean=false;
  //activeNav:string="";


  constructor(
    private readonly modePageService:ModeMainPageService,
    private readonly authService:AuthService
    ) {}

  ngOnInit(): void {
    this.authService.token$.subscribe(token=>{
      this.isLogin = token!==null;
    })



    // this.modePageService.currentRouter$.subscribe(link=>{
    //   this.activeNav=link;
    // })
    // this.modePageService.pageSize$.subscribe((mode)=>{
    //   //this.isFullScreen = mode===this.pageSizes.SHORT;
    //   //this.currentPageSize=mode;
    //   //console.log(this.currentPageSize)
    // })
   
    
  }

  @HostListener('click',['$event'])
  hostClick(event:Event){
    event.stopPropagation();
    console.log('click mobile menu container')
  }

  @HostListener('window:click')
  closeMenu(){
    console.log("close menu")
    this.isOpened=false;
    //if (this.isOpened) this.close.emit();
    // console.log(this.isOpened)
    // if (!this.isOpened){
    //   this.isOpened=true;
    //   return;
    // }
    // this.close.emit();
    // this.isOpened=false;
  }

  

  toggleMobileMenu(){
    console.log('toggle')
    this.isOpened=!this.isOpened
  }

  // selectedOption(){
  //   console.log('selectedOption')
  //   this.close.emit();
  // }

  // changeModePage(mode:number){
  //   this.modePageService.pageSize$.next(mode);
  //   //this.close.emit();
  //   this.isOpened=false;
  // }
  toLogout(){
    this.authService.token$.next(null);
    this.toggleMobileMenu();
    //this.changeModePage(this.pageSizes.LONG);
  }

  

  // toMoveMain(){
  //   //this.toMove("",PageSizes.LONG);
  //   //this.modePageService.moveToMain();
    
  //   this.close.emit();
  //   this.isOpened=false;
  // }

  // toMoveLoginForm(){
  //   this.modePageService.moveToLogin();
  //   this.close.emit();
  //   this.isOpened=false;
  //   //this.toMove('loginForm',PageSizes.MIDDLE);
  // }

  // onFullScreen(){ 
  //   this.modePageService.onFullScreen();
    
  // }

  // private toMove(path:string,modePage:number){    
  //   this.router.navigate([path]);
  //   if (!this.isFullScreen) this.modePageService.pageSize$.next(modePage);
  //   this.close.emit();
  // }

  

}
