import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  isLogin:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  toLogin(){
    console.log("tologin");
    this.isLogin=true;
  }

  toLogout(){
    console.log("logout");
    this.isLogin=false;
  }

}
