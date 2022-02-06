import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/productPage/StoragesService/storage.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  isLogin:boolean=false;  
  duration:number=0;
  areaOf:number=0;
  investments:number=0;
  geography:number=0;
  isShortMainPage:boolean = false;

  private counterDelay=20;

  constructor(private readonly router:Router,
    private readonly authService:AuthService,
    private readonly storageService:StorageService) {}

  ngOnInit(): void {
    this.authService.token$.subscribe(result=>{
      this.isLogin = result ===null
        ? false
        : true; 
        if (!this.isLogin) this.router.navigate(['']);          
    })
    this.getGlobalInformation();
  }
  
  toMainPage(){
    console.log('to main page')
    this.router.navigate([''])
    this.isShortMainPage=false;
  }
  toShortMainPage(){
    this.isShortMainPage=true;
  }

  toLogin(){ 
    this.isShortMainPage = true;
    this.router.navigate(["loginForm"]);
  }

  toLogout(){
    this.isLogin=false;
    this.isShortMainPage=false;
    this.router.navigate([""]);
  }

  
  
  private  getGlobalInformation(){
    const duration = 500;
    const areaOf = 1000;
    const investments = 48;
    const geography = 300;
    const min = Math.min(duration,areaOf,investments,geography);

    this.getDuration(duration,duration/min);
    this.getAreaOf(areaOf,areaOf/min);
    this.getInvestments(investments,investments/min);
    this.getGeography(geography,geography/min);

  }
  private async getDuration(count:number,step:number){
    let _i=0;
    let _sum=0;
    while(_i<count){
      _sum+=step;
      this.duration=Math.round(_sum);
      await this.delay(this.counterDelay);
      _i+=step;
    }
  }
  private async getAreaOf(count:number,step:number){
    let _i=0;
    let _sum=0;
    while(_i<count){
      _sum+=step;
      this.areaOf=Math.round(_sum);;
      await this.delay(this.counterDelay);
      _i+=step;
    }
  }
  private async getInvestments(count:number,step:number){
    let _i=0;
    let _sum=0;
    while(_i<count){
      _sum+=step;
      this.investments=Math.round(_sum);
      await this.delay(this.counterDelay);
      _i+=step;
    }
  }
  private async getGeography(count:number,step:number){
    let _i=0;
    let _sum=0;
    while(_i<count){
      _sum+=step;
      this.geography=Math.round(_sum);
      await this.delay(this.counterDelay);
      _i+=step;
    }
  }

  delay(timeInMillis: number): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), timeInMillis));
  }

}
