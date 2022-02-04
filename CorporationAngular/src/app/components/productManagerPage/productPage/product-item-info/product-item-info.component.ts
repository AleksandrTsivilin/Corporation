import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductInfo } from 'src/app/interfaces/product/productsInfo';


@Component({
  selector: 'app-product-item-info',
  templateUrl: './product-item-info.component.html',
  styleUrls: ['./product-item-info.component.scss']
})
export class ProductItemInfoComponent implements OnInit {

  @Input() product:ProductInfo={
    id:0,
    title:"",
    price:0,
    count:0,
    manufacturer:{id:0,title:""},
    category:{id:0,title:""},
    unit:{id:0,title:""},
    isBanned:false
  }

  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  closeProductInfo(){
    this.close.emit();
  }

}
