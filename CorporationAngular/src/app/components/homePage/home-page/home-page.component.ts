import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  isShortHeader:boolean=false;
  constructor() {  }

  ngOnInit(): void {
    
  }

  @HostListener("document:scroll")
  scrollfunction(){
    this.isShortHeader = window.pageYOffset >= 10;
  } 

}
