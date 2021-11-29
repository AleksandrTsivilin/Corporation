import { Component, OnInit, Input } from '@angular/core';
import { AvaiablesPermissions } from 'src/app/interfaces/avaiablesPermissions';
import { ProductsInfo } from 'src/app/interfaces/productsInfo';
import { Permission } from 'src/app/interfaces/userInfo';
import { ProductsService } from 'src/app/services/productPage/products.service';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {

  @Input () userId:number=0;
  //@Input () permissions:Permission[]=[];
  @Input () avaiablesPermissions:AvaiablesPermissions={
    canCreate:false,
    canRead:false,
    canUpdate:false,
    canDelete:false,
    canMove:false
  }
  isSelect:boolean=false;
  modeProductPage:string="";

  productsInfo:ProductsInfo[]=[];

  constructor(private readonly productsService:ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe((result)=>{
        this.productsInfo=result;
        console.log(this.productsInfo)
    },()=>{
      console.log("failed get products")
    })
  }

  // canGet():Boolean{
  //   return true;
  // }
  // canCreate():Boolean{
  //   return true;
  // }

  // canMove():Boolean{
  //   return true;
  // }

  onSelect(selected:string){
    this.modeProductPage=selected;
    this.isSelect=true;
  }

}
