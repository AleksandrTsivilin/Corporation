import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {

  isLogin:boolean=false;
  isOpened:boolean=false;


  constructor(private readonly authService:AuthService) {}

  ngOnInit(): void {
    this.authService.tokenData$.subscribe(tokenData=>{
      this.isLogin = tokenData!==null;
    })

  }

  @HostListener('click',['$event'])
  hostClick(event:Event){
    event.stopPropagation();
  }

  @HostListener('window:click')
  closeMenu(){
    this.isOpened=false;
  }

  

  toggleMobileMenu(){
    this.isOpened=!this.isOpened
  }

  toLogout(){
    this.authService.logout();
    this.toggleMobileMenu();
  }  
}
