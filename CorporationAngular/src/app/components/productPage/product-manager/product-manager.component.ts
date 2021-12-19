import { Component, OnInit, Input, Output } from '@angular/core';
//import { title } from 'process';
import { AvaiablesPermissions } from 'src/app/interfaces/avaiablesPermissions';
import { ProductInfo } from 'src/app/interfaces/productsInfo';
import { StorageInfo } from 'src/app/interfaces/storageInfo';
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
  @Input () @Output() avaiablesPermissions:AvaiablesPermissions={
    canCreate:false,
    canRead:false,
    canUpdate:false,
    canDelete:false,
    canMove:false
  }
  @Output () productsInfo:ProductInfo[]=[];
  @Output() storageUser:StorageInfo={
    title:""
  }
  
  isSelect:boolean=false;
  modeProductPage:string="";

 

  

  constructor(private readonly productsService:ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe((result)=>{
        this.productsInfo=result;
    },()=>{
      console.log("failed get products")
    })

    this.getStorageUser(1);
  }

  

  onSelect(selected:string){
    this.modeProductPage=selected;
    this.isSelect=true;
  }

  private getStorageUser(userId:number){
    this.productsService.getStorageByUser(userId)
    .subscribe((result)=>{
      this.storageUser=result;
    },()=>{console.log("failed getStorageUser")});
  }

}
