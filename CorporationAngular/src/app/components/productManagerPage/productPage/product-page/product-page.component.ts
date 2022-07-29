import { Component, OnInit } from '@angular/core';


// export enum Routers {
//   TABLE = "/services/products/table",
//   TEMPLATES = "/services/products/templates",
//   EDIT = "EDIT"
// }

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  constructor() { console.log("constr product page")
  }
 
  ngOnInit(): void {
  }

  
}
