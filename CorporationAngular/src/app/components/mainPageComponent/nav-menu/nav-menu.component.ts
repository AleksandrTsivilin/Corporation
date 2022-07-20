
import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

export const offsetHeader=30;
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  isLogin:boolean=false;
  isFixed:boolean=false;

  
  constructor(
    private readonly authService:AuthService
  ) { }

  ngOnInit(): void {

    this.authService.tokenData$.subscribe(tokenData=>{
      this.isLogin = tokenData === null
        ? false
        : true; 
                 
    })
  }

  @HostListener("document:scroll")
  scrollfunction(){
    this.isFixed = window.pageYOffset >= offsetHeader;  
  }  


  toLogout(){
    this.authService.logout();
  }
}
