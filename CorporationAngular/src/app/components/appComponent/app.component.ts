import { Component, HostListener, Output, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  private homePageLocation="/";
  @Output() isHeaderShort:boolean = false;

  constructor(private readonly renderer:Renderer2,
    private readonly router:Router
    ){
      router.events.subscribe((event: any)=>{

        if (event instanceof NavigationEnd) {
          const location= event.url;
          this.isHeaderShort=location!==this.homePageLocation;
          console.log(location);   
        }
      })
    }
  @HostListener("document:scroll")
  scrollfunction(){
    //this.isHeaderShort = window.pageYOffset >= 80;
    // console.log(document.documentElement.scrollTop)
    // console.log(this.isHeaderShort)
    // if (document.documentElement.scrollTop>80 && !this.isHeaderShort){      
    //   try {
    //     console.log("to go short header")
    //     const errorField = this.renderer.selectRootElement('.anchor');
    //     errorField.scrollIntoView({          
    //       block: 'start'
    //     });
        
    //     this.isHeaderShort=true;
    //   } catch (err) {console.log("error")}

    //   console.log('scrolling end ')
      
    // }  

    // else{
      
    //   if (this.isHeaderShort && document.documentElement.scrollTop<300 && document.documentElement.scrollTop>81){
    //     console.log('to go big header')
    //     this.isHeaderShort=false;
    //     try {
    //       //console.log("to go short header")
    //       const errorField = this.renderer.selectRootElement('.anchor');
    //       errorField.scrollIntoView({          
    //         block: 'end'
    //       });
          
          
    //     } catch (err) {console.log("error")}
    //   }
    // }
    
   
      
  }  
}
