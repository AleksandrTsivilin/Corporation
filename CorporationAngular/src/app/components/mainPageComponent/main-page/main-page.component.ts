import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  isLogin:boolean=false;  

  constructor(private readonly router:Router,
    private readonly authService:AuthService) {    
   }

  ngOnInit(): void {
    this.authService.token$.subscribe(result=>{
      this.isLogin = result ===null
        ? false
        : true;           
    })
  }

  toLogin(){    
    this.router.navigate(["loginForm"]);
  }

  toLogout(){
    this.isLogin=false;
    this.router.navigate([""]);
  }

}
