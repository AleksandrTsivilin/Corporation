import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AvaiablesPermissions } from 'src/app/interfaces/avaiablesPermissions';
import { FactoryInfo } from 'src/app/interfaces/location/factory/factoryInfo';
import { HeaderTable } from 'src/app/interfaces/header-table';
import { PageState } from 'src/app/interfaces/pageState';
import { ProductInfo } from 'src/app/interfaces/product/productsInfo';
import { RegionInfo } from 'src/app/interfaces/location/region/regionInfo';
import { StorageInfo } from 'src/app/interfaces/storageInfo';
import { FactoryService } from 'src/app/services/factoryManager/factory.service';
import { ProductsService } from 'src/app/services/productPage/products.service';
import { StorageService } from 'src/app/services/productPage/StoragesService/storage.service';
import { ProductUpdateService } from 'src/app/services/productPage/updateServices/product-update.service';
import { RegionService } from 'src/app/services/regionManager/region.service';
import { NewProductForm } from 'src/app/interfaces/productManagerPage/newProductForm';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input() @Output() avaiablesPermissions:AvaiablesPermissions={
    canCreate:false,
    canRead:false,
    canUpdate:false,
    canDelete:false,
    canMove:false
  }

  //@Output() editPage=new EventEmitter();

  headersTable:HeaderTable[]=[];
  productsInfo:ProductInfo[]=[];
  //currentStorages:StorageInfo[]=[{title:"Storage 1"},{title:"Storage 2"}];

  storages:StorageInfo[]=[];
  factories: FactoryInfo[]=[];
  regions: RegionInfo[]=[];
  //editProductMode:boolean=false;

  newProductForm:NewProductForm={
    storageId:0,
    title:"",
    price:0,
    count:0,
    manufacturerId:0,
    categoryId:0,
    unitId:0
  }
  
  private editedProductId:number=0;


  pageState:PageState={
    path:"loadingPage",
    isActive:false
  }
  
  constructor( 
    private readonly service:ProductsService,
    private readonly updateService:ProductUpdateService,
    private readonly storageService:StorageService,
    private readonly factoryService:FactoryService,
    private readonly regionService:RegionService
    ) { }

  ngOnInit(): void {

    this.headersTable=this.getHeadersTable(); 
    this.getProducts();
    this.getStorages();
    this.getFactories();
    this.getRegions();

    this.updateService.changesProductStorage$
      .subscribe((changes)=>{
      if (changes.length===0) return;
      changes.forEach(storage=>{
        if (this.storages
          .map(st=>st.title).includes(storage))
          {            
            console.log("changes product")
            this.getProducts();
          }
      })
      

  })
}


  // productOnLis(): void {
  //   console.log("productOnLis")
    
  //   this.signalrService.hubConnection?.on("productAdd", (newProduct:ProductInfo) => {
  //     console.log(newProduct);
  //     this.productsInfo.push(newProduct);
  //   });
  // }

  // productOnUpdateLis():void{
  //   this.signalrService.hubConnection?.on("updateProduct",(updateProduct:ProductInfo)=>{
  //     console.log("productOnUpdateLis")
  //     console.log(updateProduct); 

      
      
  //     this.productsInfo=this.productsInfo.map((p)=>{
  //       if (p.id===updateProduct.id)
  //       {
  //         console.log("compare")
  //         return {
  //           id:updateProduct.id,
  //           title:updateProduct.title,
  //           price:updateProduct.price,
  //           count:updateProduct.count,
  //           category:updateProduct.category,
  //           manufacturer:updateProduct.manufacturer,
  //           unit:updateProduct.unit,
  //           isBanned:updateProduct.isBanned
  //         }
  //       }
          
  //       else return p;
  //      });
  //   })
  // }

  // productOnRemoveLis():void{
  //   this.signalrService.hubConnection?.on("removeProduct",(id:number)=>{
  //     console.log("id")
  //     console.log (id);
  //     this.productsInfo=this.productsInfo.map((p)=>{
  //       if (p.id===id)
  //       {
  //         p.isBanned=true;
  //         console.log(p)
  //       }
  //       return p;
  //      });
  //   })
  // }



  startEdit(editProduct:ProductInfo){
    
    // this.editProduct={
    //   id:editProduct.id,
    //   title:editProduct.title,
    //   count:editProduct.count,
    //   price:editProduct.price,
    //   category:editProduct.category,
    //   manufacturer:editProduct.manufacturer,
    //   unit:editProduct.unit,
    //   isBanned:editProduct.isBanned
    // }

    console.log('edit product')

    this.editedProductId=editProduct.id;
    this.newProductForm={
      storageId:0,
      title:editProduct.title,
      price:editProduct.price,
      count:editProduct.count,
      manufacturerId:editProduct.manufacturer.id,
      categoryId:editProduct.category.id,
      unitId:editProduct.unit.id
    }
    
    this.setStatePage("editProduct",false);
    
    
  }

  remove(removeProduct:ProductInfo){
    this.updateService.remove(removeProduct.id);
    //this.signalrService.removeProduct(removeProduct.id);
  }

  update(updateProduct:NewProductForm){
    updateProduct.storageId=0;
    //this.updateService.updateProduct(updateProduct,this.editedProductId);
    
  }

  closeEditPage(){
    console.log("closeEditPage")
    this.setStatePage("",true)
    //this.editProductMode=false;
    this.editedProductId=0;
  }
  private setStatePage(path: string, isActive: boolean) {
    this.pageState={
      path:path,
      isActive:isActive
    }
  }

  sortCol(criteria:string){
    // console.log("sortBy");
    // criteria===this._sortCriteria
    //   ? this._ascDirection *= -1
    //   : this._ascDirection = 1;
    
    // this._sortCriteria=criteria;
    // let orderedUsersInfo= this.usersInfo.sort((a:UserInfo,b:UserInfo)=>{
    //   let orderItemFirst=a[criteria];
    //   let orderItemSecond=b[criteria];
    //   const less = -1 * this._ascDirection;
    //   const more = 1 * this._ascDirection;

    //   if (typeof orderItemFirst === 'string') {
    //     return orderItemFirst.toLowerCase() <= orderItemSecond.toLowerCase() ? less : more;
    //   } else {
    //     return orderedUsersInfo <= orderItemSecond ? less : more;
    //   }
      
    // })
    // this.usersInfo=orderedUsersInfo;
  }

  private getHeadersTable():HeaderTable[]{
    const headers= [{
      title:'#',
      isActive:false
    },
    {
      title:"title",
      isActive:true
    },{
      title:"manufacturer",
      isActive:true
    },{
      title:"category",
      isActive:true
    },{
      title:"count",
      isActive:true
    },{
      title:"unit",
      isActive:true
    },{
      title:"price",
      isActive:true
    }];

    if (this.avaiablesPermissions.canUpdate) {
      headers.push({title:"edit",isActive:false});
    }

    if (this.avaiablesPermissions.canDelete) {
      headers.push({title:"delete",isActive:false})
    }

    return headers;
  }

  private getProducts(){
     this.service.getProductsByAccess()
      .subscribe((result)=>{    
        this.productsInfo=result;        
        this.setStatePage("",true);
        
        
    },(err)=>{
      this.setStatePage("responce500",false);
    })
  }

  private getStorages(){
    this.storageService.getStoragesByAccess()
      .subscribe(storages=>{
        this.storages=storages;
        console.log(this.storages)
      })
  }

  private getFactories(){
    this.factoryService.getFactoriesByAcces()
      .subscribe(factories=>{
        this.factories=factories;
      })
  }

  private getRegions(){
    this.regionService.getRegionsByAccess()
      .subscribe(regions=>{
        this.regions = regions;
      })
  }

}
