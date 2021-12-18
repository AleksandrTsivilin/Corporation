import { Component, Input, OnInit } from '@angular/core';
import { FormMoveProducts } from 'src/app/interfaces/formMoveProduct';
import { HeaderTable } from 'src/app/interfaces/header-table';
import { ProductInfo } from 'src/app/interfaces/productsInfo';
import { ProductsService } from 'src/app/services/productPage/products.service';

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
  storagesInfo:Storage[]=[];
  constructor(private readonly service:ProductsService) {
    
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

    this.getStorages();


  }

  

  onSubmit(){    
    //console.log(this.formMovedProducts)
    const movedProduct= this.formMovedProducts.movedProducts
      .filter(product=>product.isChecked);
    console.log(this.formMovedProducts.to);
    console.log(movedProduct)
  }

  change(){
    const totalProducts =this.formMovedProducts.movedProducts
      .filter(p=>p.isChecked)
      .map(p=>p.price*p.countMoved);
    
    this.totalMoved = totalProducts.length>0
      ? totalProducts.reduce((a,b)=>a+b)
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
    return headers;
  }

  private getStorages() {
    this.service.getStorages()
      .subscribe((result)=>{
        this.storagesInfo=result;
      },()=>{console.log("failed getStorage")})
  }

}
