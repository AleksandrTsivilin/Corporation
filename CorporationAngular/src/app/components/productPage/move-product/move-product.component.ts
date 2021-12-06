import { Component, Input, OnInit } from '@angular/core';
import { FormMoveProducts } from 'src/app/interfaces/formMoveProduct';
import { ProductInfo } from 'src/app/interfaces/productsInfo';

@Component({
  selector: 'app-move-product',
  templateUrl: './move-product.component.html',
  styleUrls: ['./move-product.component.scss']
})
export class MoveProductComponent implements OnInit {

  @Input () productsInfo:ProductInfo[]=[];

  formMovedProducts:FormMoveProducts={
    to:'',
    movedProducts:[]
  }

  
  constructor() {
    
   }

  ngOnInit(): void {
    for (let product of this.productsInfo){
      this.formMovedProducts.movedProducts.push({
        id:product.id,
        title:product.title,
        avaiableCount:product.count,
        countMoved:0,
        isChecked:false,
      })
    }
  }

  checkedProduct(index:number){
    console.log("checkedProduct")
    console.log(index)
    let b=this.formMovedProducts.movedProducts[index].isChecked;
    this.formMovedProducts.movedProducts[index].countMoved=
      b? this.formMovedProducts.movedProducts[index].avaiableCount
      :0;
    //let c=this.formMovedProducts.movedProducts[index].countMoved;
    
    console.log(b)
    //console.log(c)
  }

  onSubmit(){
    console.log(this.formMovedProducts);
    let movedProducts=this.formMovedProducts.movedProducts
      .filter(product=>product.isChecked)
    console.log(movedProducts);
  }

}
