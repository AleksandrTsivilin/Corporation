import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductLocalStorageService } from 'src/app/services/productPage/product-local-storage.service';

export const keyPage = "pt";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  private defaultRouter = "/services/products";
  private defaultInnerRouter = "/templates"

  constructor(
    private readonly router:Router,
    private readonly localStorage:ProductLocalStorageService
    ) { 
    //this.getPageData();
  }

  ngOnInit(): void {
  }

  // private getPageData(){

  //   // const router = history.state.router;
  //   // let routerLink = this.defaultRouter;
  

  //   // if ( router ) return;

  //   // routerLink =  this.getRouterFromLocalStorage();

  //   // console.log(routerLink)

  //   // this.router.navigate([routerLink]); 
  // }

  // private getRouterFromLocalStorage() : string{
  //   const innerRouter =  this.localStorage.get("innerRouter");
    
  //   return innerRouter !== null && innerRouter !== undefined
  //     ? this.defaultRouter + innerRouter
  //     : this.defaultRouter + this.defaultInnerRouter;
  // }

}
