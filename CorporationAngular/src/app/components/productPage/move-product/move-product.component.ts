import { Component, Input, OnInit } from '@angular/core';
import { FormMoveProducts } from 'src/app/interfaces/formMoveProduct';
import { HeaderTable } from 'src/app/interfaces/header-table';
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

  headersTable:HeaderTable[]=[];
  totalMoved:number=0;
  constructor() {
    
   }

  ngOnInit(): void {

    this.headersTable=this.getHeadersTable();

    for (let product of this.productsInfo){
      this.formMovedProducts.movedProducts.push({
        id:product.id,
        title:product.title,
        avaiableCount:product.count,
        countMoved:0,
        isChecked:false,
        price:product.price,
        unit:product.unit
      })
    }
  }

  

  onSubmit(){    
    let movedProducts=this.formMovedProducts.movedProducts
      .filter(product=>product.isChecked)
    console.log(movedProducts);
  }

  change(){
    let a =this.formMovedProducts.movedProducts
      .filter(p=>p.isChecked)
      .map(p=>p.price*p.countMoved);
    
    this.totalMoved = a.length>0
      ? a.reduce((a,b)=>a+b)
      : 0;
    
    
      
      console.log(this.totalMoved);
    
  }

  private getHeadersTable():HeaderTable[]{
    const headers= [{
      title:'#',
      isActive:false
    },
    {
      title:"✔️",
      isActive:false
    },{
      title:"count",
      isActive:true
    },{
      title:"title",
      isActive:true
    },{
      title:"avaiable count",
      isActive:true
    },{
      title:"unit",
      isActive:true
    },{
      title:"price",
      isActive:true
    }];

    // if (this.avaiablesPermissions.canUpdate) {
    //   headers.push({title:"edit",isActive:false});
    // }

    // if (this.avaiablesPermissions.canDelete) {
    //   headers.push({title:"delete",isActive:false})
    // }

    return headers;
  }

}
