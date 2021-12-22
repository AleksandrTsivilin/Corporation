import { Component, Input, OnInit } from '@angular/core';
import { FormMoveProducts } from 'src/app/interfaces/formMoveProduct';
import { HeaderTable } from 'src/app/interfaces/header-table';
import { ProductInfo } from 'src/app/interfaces/productsInfo';
import { StorageInfo } from 'src/app/interfaces/storageInfo';
import { ProductsService } from 'src/app/services/productPage/products.service';
import { SignalrProductService } from 'src/app/services/productPage/signalr-product.service';

@Component({
  selector: 'app-move-product',
  templateUrl: './move-product.component.html',
  styleUrls: ['./move-product.component.scss']
})
export class MoveProductComponent implements OnInit {

  @Input () productsInfo:ProductInfo[]=[];
  @Input () storage:string="";
  formMovedProducts:FormMoveProducts={
    from:'',
    to:'',
    movedProducts:[]
  }

  
  headersTable:HeaderTable[]=[];
  totalMoved:number=0;
  storagesInfo:StorageInfo[]=[];
  constructor(
    private readonly service:ProductsService,
    private readonly signalrService:SignalrProductService) {
    
   }

  ngOnInit(): void {

    this.headersTable=this.getHeadersTable();

    this.formMovedProducts.from=this.storage;
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
    // this.formMovedProducts.movedProducts=this.formMovedProducts.movedProducts
    //   .filter(product=>product.isChecked);
    // console.log(this.formMovedProducts);

    // const formCheckedProducts={
    //   from:this.formMovedProducts.from,
    //   to:this.formMovedProducts.to,
    //   products:this.formMovedProducts.movedProducts
    //     .filter((p)=>p.isChecked)
    // }
    this.signalrService.moveProducts(this.formMovedProducts);    
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
