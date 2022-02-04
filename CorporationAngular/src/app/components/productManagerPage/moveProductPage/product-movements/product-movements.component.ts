
import { Component, OnInit } from '@angular/core';

//import { FormMoveProducts } from 'src/app/interfaces/product/MovementProductManagerPage/movementProductForm';
import { HeaderTable } from 'src/app/interfaces/header-table';
import { PageState } from 'src/app/interfaces/pageState';
import { MovedProductAction } from 'src/app/interfaces/product/MovementProductManagerPage/movedProductAction';
import { MovementProductForm } from 'src/app/interfaces/product/MovementProductManagerPage/movementProductForm';
import { ProductInfo } from 'src/app/interfaces/product/productsInfo';
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

  formMovedProducts:MovementProductForm={
    from:0,
    to:0,
    movementProducts:[]
  }

  

  currentStorage:StorageInfo={id:0,title:""};

  avaiableStorages:StorageInfo[]=[];
  movedProductActions:MovedProductAction [] = [];

  headersTable:HeaderTable[]=[];
  totalMoved:number=0;

  pageState:PageState={
    path:"loadingPage",
    isActive:false
  }

  constructor(
      
      private readonly updateService:MovementsUpdateService,
      private readonly updateServiceProduct:ProductUpdateService,
      private readonly storageService:StorageService,
      private readonly productService:ProductsService
     
      ) { }

  ngOnInit(): void {

    this.headersTable= this.getHeadersTable();
    this.getCurrentStorage();
    
    this.createMovedProductAction();   
    this.getAvaiableStorages();
    
    


  this.updateServiceProduct.changesProductStorage$
  .subscribe((changedStorages)=>{
    console.log("movements update");
    changedStorages.forEach(storage=>{
      if (storage===this.currentStorage.id)
      this.createMovedProductAction();
    })
  })

  }

  onSubmit(){  
    console.log(this.movedProductActions)

    this.formMovedProducts.from = this.currentStorage.id;
    const movedProduct = this.movedProductActions
    .filter(product=>product.isSelected);
    this.formMovedProducts.movementProducts=[];
    movedProduct.forEach(product=>{
      this.formMovedProducts.movementProducts.push({
        productId:product.id,
        movedCount:product.countMoved
      })
    })
    
    this.updateService.moveProducts(this.formMovedProducts);        
  }

  change(){
    
    const totalProducts = this.movedProductActions
    .filter(product=>product.isSelected)
    .map(product=>product.price*product.countMoved);
    this.totalMoved = totalProducts.length>0
      ? totalProducts.reduce((a,b)=>a+b)
      : 0;
      
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

  private setStatePage(path: string, isActive: boolean) {
    this.pageState={
      path:path,
      isActive:isActive
    }
  }

  private updateMovedProduct(products:ProductInfo[]){
    if (products ===undefined) return;
    
    this.formMovedProducts.movementProducts=[];
    
  }

  
  private createMovedProductAction(){
    this.productService.getProductsByUser()
      .subscribe((products)=>{
        this.setStatePage("",true);
        this.setMovedProductAction(products);       
      },(products)=>{
        console.log(products)
        this.setStatePage("responce500",false);
      })
  }
  private setMovedProductAction(products : ProductInfo[]){
    this.movedProductActions=[];
    products.forEach(product=>{
    if (!product.isBanned) this.movedProductActions.push({
        id:product.id,
        title:product.title,
        avaiableCount:product.count,
        countMoved:0,
        isSelected:false,
        price:product.price,
        unit:product.unit.title
    })
    })
  }
  private getCurrentStorage(){
    this.storageService.getStorageByUser("ProductMovementManager")
    .subscribe((result)=>{
      this.currentStorage=result;
      this.formMovedProducts.from=this.currentStorage.id;
    },()=>{console.log("failed getStorageUser")});
  }

  private getAvaiableStorages(){
    this.storageService.getStoragesByAccess("ProductMovementManager")
      .subscribe((result)=>{
        this.avaiableStorages=result
        .filter(storage=>storage.title!==this.currentStorage.title);
      },()=>{console.log("failed getStorage")})
  }

}
