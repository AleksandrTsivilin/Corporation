import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovedProductAction } from 'src/app/interfaces/product/MovementProductManagerPage/movedProductAction';
//import { MovedProduct } from 'src/app/interfaces/product/MovementProductManagerPage/movementProductForm';

@Component({
  selector: 'tr[app-product-item-movements]',
  templateUrl: './product-item-movements.component.html',
  styleUrls: ['./product-item-movements.component.scss']
})
export class ProductItemMovementsComponent implements OnInit {

  @Input() numProduct:number=0;
  @Input() productInfo:MovedProductAction={
    id:0,
    title:"",
    avaiableCount:0,
    countMoved:0,
    price:0,
    unit:"",
    isSelected:false
  }

  @Output() onCountMoved=new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  checkedProduct(checkedProduct:MovedProductAction){
    checkedProduct.countMoved= checkedProduct.isSelected
      ?checkedProduct.avaiableCount
      :0;
      console.log("checked product")
      this.onCountMoved.emit();
  }

  changeCount(){
    this.onCountMoved.emit();
  }

}
