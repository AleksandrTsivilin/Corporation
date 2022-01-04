
import { Component, OnInit } from '@angular/core';
import { FormMoveProducts } from 'src/app/interfaces/formMoveProduct';
import { HeaderTable } from 'src/app/interfaces/header-table';
import { ProductInfo } from 'src/app/interfaces/productsInfo';
import { StorageInfo } from 'src/app/interfaces/storageInfo';
import { ProductsService } from 'src/app/services/productPage/products.service';
import { StorageService } from 'src/app/services/productPage/StoragesService/storage.service';
//import { SignalrProductService } from 'src/app/services/productPage/signalr-product.service';
import { MovementsUpdateService } from 'src/app/services/productPage/updateServices/movements-update.service';
import { ProductUpdateService } from 'src/app/services/productPage/updateServices/product-update.service';
//import { UpdateService } from 'src/app/services/update.service';

@Component({
  selector: 'app-product-movements',
  templateUrl: './product-movements.component.html',
  styleUrls: ['./product-movements.component.scss']
})
export class ProductMovementsComponent implements OnInit {

  formMovedProducts:FormMoveProducts={
    from:"",
    to:"",
    movedProducts:[]
  }

  

  currentStorage:string="";

  avaiableStorages:StorageInfo[]=[];

  headersTable:HeaderTable[]=[];
  totalMoved:number=0;

  constructor(
      private service:ProductsService,
      private readonly updateService:MovementsUpdateService,
      private readonly updateServiceProduct:ProductUpdateService,
      private readonly storageService:StorageService
      //private readonly serviceUpdate:UpdateService,
      //private readonly signalrService:SignalrProductService
      ) { }

  ngOnInit(): void {

    this.headersTable= this.getHeadersTable();
    this.getCurrentStorage();
    console.log(this.currentStorage)
       
    this.setFormMovedProduct();    
    this.getAvaiableStorages();
    
    this.updateService.movementsProduct$.subscribe((result)=>{
      console.log("sub productstorage")
      result.forEach(r=>{
        if (r===this.currentStorage){
          console.log("compare")
          this.setFormMovedProduct();

        }
          
      })
      // if (result.length===0) return;
      // const storageFrom=result[0];
      // const storageTo=result[1];
      // if (storageFrom.storage===this.currentStorage.title){
      //   this.updateMovedProduct(storageFrom.products);
      // }
      // if (storageTo.storage==this.currentStorage.title)
      //   this.updateMovedProduct(storageTo.products);
    })


  this.updateServiceProduct.changesProductStorage$.subscribe((result)=>{
    result.forEach(r=>{
      if (r===this.currentStorage){
        console.log("compare")
        this.setFormMovedProduct();

      }
        
    })
  })

  }

  onSubmit(){  
    console.log(this.formMovedProducts)
    this.updateService.moveProducts(this.formMovedProducts);        
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

  private setFormMovedProduct(){
    this.service.getProductsByUser()
      .subscribe((products)=>{
        console.log(products)
        this.setMovedProduct(products);        
      })
  }

  private updateMovedProduct(products:ProductInfo[]){
    if (products ===undefined) return;
    
    this.formMovedProducts.movedProducts=[];
    this.setMovedProduct(products);    
  }

  private setMovedProduct(products:ProductInfo[]) {
    this.formMovedProducts.movedProducts=[];
    for (let product of products){
      if (product.isBanned) continue;
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
    console.log(this.formMovedProducts.movedProducts)
  }
  private getCurrentStorage(){
    this.storageService.getStorageByUser()
    .subscribe((result)=>{
      this.currentStorage=result.title;
      this.formMovedProducts.from=this.currentStorage;
    },()=>{console.log("failed getStorageUser")});
  }

  private getAvaiableStorages(){
    this.storageService.getStoragesByAccess()
      .subscribe((result)=>{
        this.avaiableStorages=result
        .filter(storage=>storage.title!==this.currentStorage);
      },()=>{console.log("failed getStorage")})
  }

}
