import { Component, OnInit } from '@angular/core';
import { Manufacturer } from 'src/app/interfaces/productsInfo';
import { ProductsService } from 'src/app/services/productPage/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  manufacturers:Manufacturer[]=[];
  constructor(private readonly service:ProductsService) { }

  ngOnInit(): void {
    this.getManufacturers()
  }

  onSubmit(){

  }

  private getManufacturers():Manufacturer[]{
    this.service.getManufacturers()
    .subscribe((result)=>{
      this.manufacturers=result;
      
  },()=>{
    console.log("failed get manufacturers")
  })
    return [];
  }

}
