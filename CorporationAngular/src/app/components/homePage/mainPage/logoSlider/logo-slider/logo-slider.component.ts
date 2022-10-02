
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo-slider',
  templateUrl: './logo-slider.component.html',
  styleUrls: ['./logo-slider.component.scss']
})
export class LogoSliderComponent implements OnInit {

  arrImages:string[]=[];

  constructor() { }

  ngOnInit(): void {
    this.getArrImage();
  }

  private getArrImage(){
    this.arrImages=[
      'assets/images/logo_picture/angular_logo.png',
      'assets/images/logo_picture/signalr_logo.png',
      'assets/images/logo_picture/tailwind_logo.png',
      'assets/images/logo_picture/git_hub_logo.png',
      'assets/images/logo_picture/asp_net_logo.png',
      'assets/images/logo_picture/entity_logo.jpeg'
      
    ]
  }

}
