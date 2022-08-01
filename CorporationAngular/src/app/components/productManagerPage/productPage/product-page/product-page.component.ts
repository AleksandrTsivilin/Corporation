import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  //constructor() {console.log("product page constr"); debugger}
  
 
  ngOnInit(): void {
    //console.log("product page on init") ;  debugger
  }  


  ngOnDestroy(): void {
    //console.log("product page on destroy") ; debugger
  }
}
