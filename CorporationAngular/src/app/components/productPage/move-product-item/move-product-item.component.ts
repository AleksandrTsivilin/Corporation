import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MovedProduct } from 'src/app/interfaces/formMoveProduct';
import { ProductInfo } from 'src/app/interfaces/productsInfo';

@Component({
  selector: 'tr[app-move-product-item]',
  templateUrl: './move-product-item.component.html',
  styleUrls: ['./move-product-item.component.scss']
})
export class MoveProductItemComponent implements OnInit {

  @Input() numProduct:number=0;
  @Input() productInfo:MovedProduct={
    id:0,
    title:"",
    avaiableCount:0,
    countMoved:0,
    isChecked:false,
    price:0,
    unit:""
  }

  @Output() onCountMoved=new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  checkedProduct(checkedProduct:MovedProduct){
    checkedProduct.countMoved= checkedProduct.isChecked
      ?checkedProduct.avaiableCount
      :0;

      this.onCountMoved.emit();
  }

  changeCount(){
    this.onCountMoved.emit();
  }

}
