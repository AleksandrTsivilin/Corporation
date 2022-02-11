import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AvaiablesPermissions } from 'src/app/interfaces/avaiablesPermissions';
import { ProductInfo } from 'src/app/interfaces/product/productsInfo';

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
    manufacturer:{id:0,title:""},
    category:{id:0,title:""},
    unit:{id:0,title:""},
    isBanned:false
  };

  @Input() avaiablesPermissions:AvaiablesPermissions={
    canCreate:false,
    canRead:false,
    canUpdate:false,
    canDelete:false,
    canMove:false
  }

  @Output() edit=new EventEmitter();
  @Output() remove=new EventEmitter();
  @Output() openProductInfo = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  editProduct(){
    this.edit.emit();
  }

  removeProduct(){
    this.remove.emit();
  }

  openProductItemInfo(){
    this.openProductInfo.emit();
  }

}
