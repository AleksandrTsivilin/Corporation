import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  isShortHeader:boolean=false;

  private isLocked:boolean=false;
  constructor(private readonly renderer:Renderer2) { console.log("home page constr") }

  ngOnInit(): void {
  }

  @HostListener("document:scroll")
  scrollfunction(){
    //console.log(document.body.scrollTop)
    //console.log(document.documentElement.scrollTop)
    if (document.documentElement.scrollTop>250 && !this.isShortHeader)
    {
      console.log(document.documentElement.scrollTop)
      this.isShortHeader=true;
      try {
        const errorField = this.renderer.selectRootElement('.header-nav-container');
        errorField.scrollIntoView({          
          block: 'end'
        });
      } catch (err) {console.log("error")}
      
    }  
    if (document.documentElement.scrollTop===0 && this.isShortHeader){
      this.isShortHeader = false;
    } 

      
  }

  to(){
      try {
        const errorField = this.renderer.selectRootElement('.s');
        errorField.scrollIntoView({
          block: 'end',
          nearest: 'inline',
          behavior: 'smooth',
        });
      } catch (err) {}
  }

}
