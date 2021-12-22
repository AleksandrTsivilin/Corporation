import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovedProduct } from 'src/app/interfaces/formMoveProduct';

@Component({
  selector: 'tr[app-product-item-movements]',
  templateUrl: './product-item-movements.component.html',
  styleUrls: ['./product-item-movements.component.scss']
})
export class ProductItemMovementsComponent implements OnInit {

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
