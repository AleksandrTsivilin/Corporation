import { Component, Directive, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page-image',
  templateUrl: './main-page-image.component.html',
  styleUrls: ['./main-page-image.component.scss']
})


// @Directive({
//   selector:"[simpleSlider]",
//   inputs:["config:simpleSlider"],
//   host:{
//     "[attr.data-simple-slider-id]":"id",
//     "[class.simple-slider-directive]":"true"
//   }
// })
export class MainPageImageComponent implements OnInit {

  images:string[]=[
    "assets/images/logo_main_paige.png",
    "assets/images/logo_tailwind.png"
  ]
  constructor() { }

  ngOnInit(): void {
    //this.move();
  }

  toggle(){
    console.log("toggle main image")
  }

  private async move(){
    
    while(true){
      await this.delay(2000);
      //console.log("true")
    }
  }

  delay(timeInMillis: number): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), timeInMillis));
  }



}
