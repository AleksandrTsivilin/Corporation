import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  duration:number = 500;
  areaOf:number=1000;
  investments:number=48;
  geography:number=300;
  
  private counterDelay=20;

  constructor() { }

  ngOnInit(): void {
    this.getInfo();
  }

  private  getInfo(){
    let min = this.calculate();

    this.getDuration(this.duration,this.duration/min);
    this.getAreaOf(this.areaOf,this.areaOf/min);
    this.getInvestments(this.investments,this.investments/min);
    this.getGeography(this.geography,this.geography/min);

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

  private calculate():number{
    return Math.min(
      this.duration,
      this.areaOf,
      this.investments,
      this.geography);
  }

}
