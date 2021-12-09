import { Component, Input, OnInit } from '@angular/core';
import { AvaiablesPermissions } from 'src/app/interfaces/avaiablesPermissions';
import { ProductInfo } from 'src/app/interfaces/productsInfo';

@Component({
  selector: 'tr[app-product-item]',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() numProduct:number=0;
  @Input() productInfo:ProductInfo={
    id:0,
    title:"",
    count:0,
    price:0,
    manufacturer:"",
    category:"",
    unit:""
  };

  @Input() avaiablesPermissions:AvaiablesPermissions={
    canCreate:false,
    canRead:false,
    canUpdate:false,
    canDelete:false,
    canMove:false
  }

  constructor() { }

  ngOnInit(): void {
  }

  editProduct(){

  }

  removeProduct(){
    
  }
  

}
