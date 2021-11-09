import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  isLogin:boolean=false;

  constructor(private readonly router:Router) {
    
   }

  ngOnInit(): void {
  }

  toLogin(){
    console.log("tologin");
    this.isLogin=false; // if token !==null isLogin=true else false
    this.isLogin? this.router.navigate(["roleSelector"])
                : this.router.navigate(["loginForm"]);
    
  }

  toLogout(){
    console.log("logout");
    this.isLogin=false;
    this.router.navigate([""]);
  }

}
