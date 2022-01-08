import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AvaiablesPermissions } from 'src/app/interfaces/avaiablesPermissions';
import { FormAddProduct } from 'src/app/interfaces/formAddProduct';
import { HeaderTable } from 'src/app/interfaces/header-table';
import { NewProductForm } from 'src/app/interfaces/productManagerPage/newProductForm';
import { ProductInfo } from 'src/app/interfaces/productsInfo';
import { StorageInfo } from 'src/app/interfaces/storageInfo';
import { ProductsService } from 'src/app/services/productPage/products.service';
//import { SignalrProductService } from 'src/app/services/productPage/signalr-product.service';
import { ProductUpdateService } from 'src/app/services/productPage/updateServices/product-update.service';

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
  currentStorages:StorageInfo[]=[{title:"Storage 1"},{title:"Storage 2"}];
  editProductMode:boolean=false;

  newProductForm:NewProductForm={
    storage:"",
    title:"",
    price:0,
    count:0,
    manufacturer:"",
    category:"",
    unit:"",
    isBanned:false
  }

  private editedProductId:number=0;

  // editProduct:ProductInfo={
  //   id:0,
  //   title:"",
  //   count:0,
  //   price:0,
  //   category:"",
  //   manufacturer:"",
  //   unit:"",
  //   isBanned:false
  // }

  // private readonly signalrService:SignalrProductService
  constructor( 
    private readonly service:ProductsService,
    private readonly updateService:ProductUpdateService
    ) { }

  ngOnInit(): void {

    this.headersTable=this.getHeadersTable(); 
    this.getProducts();
    

    

    // if (!this.signalrService.isConnection)
    //   this.signalrService.startConnection();

    // this.productOnLis();
    // this.productOnUpdateLis();
    // this.productOnRemoveLis();
    this.updateService.changesProductStorage$
      .subscribe((changes)=>{
        console.log(changes);
      if (changes.length===0) return;
      changes.forEach(storage=>{
        if (this.currentStorages
          .map(st=>st.title).includes(storage))
          {
            //this.productsInfo=ch.movedProducts;
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
      storage:"Storage 1",
      title:editProduct.title,
      price:editProduct.price,
      count:editProduct.count,
      manufacturer:editProduct.manufacturer,
      category:editProduct.category,
      unit:editProduct.unit,
      isBanned:editProduct.isBanned
    }
    //this.editPage.emit();
    this.editProductMode=true;
    
  }

  remove(removeProduct:ProductInfo){
    this.updateService.remove(removeProduct.id);
    //this.signalrService.removeProduct(removeProduct.id);
  }

  // unLock(unLockProduct:ProductInfo){
  //   this.signalrService.unLockProduct(unLockProduct.id);
  // }

  update(updateProduct:NewProductForm){
    updateProduct.storage="Storage 1";
    this.updateService.updateProduct(updateProduct,this.editedProductId);
    //this.signalrService.updateProduct(updateProduct,this.editProduct.id)
    this.editProductMode=false;
  }

  closeEditPage(){
    console.log("closeEditPage")
    this.editProductMode=false;
    this.editedProductId=0;
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

  private async getProducts(){
    await this.service.getProductsByAccess()
      .subscribe((result)=>{
        
        this.productsInfo=result;
        console.log(this.productsInfo)
    },()=>{
      console.log("failed get products")
    })
  }

  

}
