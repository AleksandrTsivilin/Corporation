
import { Component, OnInit, Output } from '@angular/core';

import { HeaderTable } from 'src/app/interfaces/header-table';
import { PageState } from 'src/app/interfaces/pageState';
import { MovedProductAction } from 'src/app/interfaces/product/MovementProductManagerPage/movedProductAction';
import { MovementProductForm } from 'src/app/interfaces/product/MovementProductManagerPage/movementProductForm';
import { ProductInfo } from 'src/app/interfaces/product/productsInfo';
import { StorageInfo } from 'src/app/interfaces/storageInfo';
import { ProductsService } from 'src/app/services/productPage/products.service';
import { StorageService } from 'src/app/services/productPage/StoragesService/storage.service';
import { MovementsUpdateService } from 'src/app/services/productPage/updateServices/movements-update.service';
import { ProductUpdateService } from 'src/app/services/productPage/updateServices/product-update.service';
import { TabService } from 'src/app/services/tab.service';


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

  public currentErrors:string="";
  private _ascDirection = 1;
  private _sortCriteria="";
  
  constructor(
      
      private readonly updateService:MovementsUpdateService,
      private readonly updateServiceProduct:ProductUpdateService,
      private readonly storageService:StorageService,
      private readonly productService:ProductsService,
      private readonly tabService:TabService
     
      ) {
          // tabService.addedTab({
          //   title: "add movements products",
          //   router: "/services/addMovementProduct",
          //   additional: "",
          //   key: undefined
          // })
       }

  ngOnInit(): void {

    this.headersTable= this.getHeadersTable();
    this.getCurrentStorage();
    
    this.createMovedProductAction();   
    this.getAvaiableStorages();
    


  this.updateServiceProduct.changesProductStorage$
    .subscribe((changedStorages)=>{
      this.updateProduct(changedStorages)
    })
  
  this.updateService.movementsProduct$
    .subscribe((changedStorages)=>{
      this.updateProduct(changedStorages)
    })

  }

  onSubmit(){  
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
  openWarningDialog(event:any){
    this.currentErrors = "countMoved can't be more than avaiableCount\ncountMove"+" " + event.countMoved.toString()+"\n"
    + "avaiableCount" + " " + event.avaiableCount.toString();
    this.setStatePage("warningDialog",false);
  }
  closeWarningDialog(){
    this.setStatePage("",true);
  }

  sortCol(header:HeaderTable){
    if (!header.isActive) return;
    const currentHeader = this.convert(header.title);
    let criteria = currentHeader;
    console.log(criteria)
    criteria===this._sortCriteria
      ? this._ascDirection *= -1
      : this._ascDirection = 1;
    
    this._sortCriteria=criteria;
    let orderedUsersInfo= this.movedProductActions
      .sort((a:MovedProductAction,b:MovedProductAction)=>{
      let orderItemFirst=a[criteria];
      let orderItemSecond=b[criteria];
      console.log(orderItemFirst)
      const less = -1 * this._ascDirection;
      const more = 1 * this._ascDirection;

      if (typeof orderItemFirst === 'string') {
        return orderItemFirst.toLowerCase() <= orderItemSecond.toLowerCase() ? less : more;
      } else if (typeof orderItemFirst ==='number'){
        return orderItemFirst <= orderItemSecond ? less:more
      }  else {
        console.log("obj")
        return orderItemFirst.title <= orderItemSecond.title ? less : more;
      }
      
    })
    this.movedProductActions=orderedUsersInfo;
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
      title:"count moved",
      isActive:false
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

  private convert(rawHeader:string):string{
    console.log(rawHeader)
    if (!rawHeader.includes(" ")) return rawHeader;
    const indexSpace = rawHeader.indexOf(" ");
    rawHeader = rawHeader.replace(" ","");
    let newHeader = rawHeader
      .substring(0,indexSpace) + rawHeader[indexSpace].toUpperCase() + rawHeader.substring(indexSpace+1,rawHeader.length);
    
    console.log(newHeader)
    return newHeader;
  }

  private setStatePage(path: string, isActive: boolean) {
    this.pageState={
      path:path,
      isActive:isActive
    }
  }

  private updateProduct(changes : number[]){
    console.log("movements update");
    changes.forEach(storage=>{
      if (storage===this.currentStorage.id)
        this.createMovedProductAction();
    })
  }

  
  private createMovedProductAction(){
    this.productService.getProductsByUser()
      .subscribe((products)=>{
        console.log(products)
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
