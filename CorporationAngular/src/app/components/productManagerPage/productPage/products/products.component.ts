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
import { NewProductForm } from 'src/app/interfaces/product/newProductForm';
import { MovementsUpdateService } from 'src/app/services/productPage/updateServices/movements-update.service';
import { debounceTime } from 'rxjs/operators';
import { ProductFilterForm } from 'src/app/interfaces/product/productFilterForm';
import { ManufacturerService } from 'src/app/services/productPage/ManufacturersService/manufacturer.service';
import { ManufacturerInfo } from 'src/app/interfaces/product/manufacturerManagerPage/manufacturerInfo';
import { CategoryService } from 'src/app/services/productPage/CategoriesService/category.service';
import { CategoryInfo } from 'src/app/interfaces/product/categoryManagerPage/categoryInfo';
import { UnitInfo } from 'src/app/interfaces/product/unitManagerPage/unitInfo';
import { UnitService } from 'src/app/services/productPage/UnitsService/unit.service';




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

  

  headersTable:HeaderTable[]=[];
  productsInfo:ProductInfo[]=[];

  storages:StorageInfo[]=[];
  //factories: FactoryInfo[]=[];
  //regions: RegionInfo[]=[];
  //manufacturers:ManufacturerInfo[]=[];
  //categories:CategoryInfo[]=[];
  //units:UnitInfo[]=[];

  newProductForm:NewProductForm={
    storageId:0,
    title:"",
    price:0,
    count:0,
    manufacturerId:0,
    categoryId:0,
    unitId:0
  }
  selectedProduct : ProductInfo={
    id:0,
    title:"",
    price:0,
    count:0,
    manufacturer:{id:0,title:""},
    category:{id:0,title:""},
    unit:{id:0,title:""},
    isBanned:false
  }

  productFilterForm:ProductFilterForm = {
    title:"",
    regionId:0,
    factoryId:0,
    storageId:0,
    manufacturerId:0,
    categoryId:0,
    unitId:0,
    startPrice:0,
    endPrice:10000,
    startCount:0,
    endCount:10000
  }
  
  isOpenDetailedSearch:boolean =false;
  isApplyFilter:boolean=false;
  private editedProductId:number=0;
  private _ascDirection = 1;
  private _sortCriteria="";
  

  pageState:PageState={
    path:"loadingPage",
    isActive:false
  }
  
  constructor( 
    private readonly service:ProductsService,
    private readonly updateService:ProductUpdateService,
    private readonly updateMovementService:MovementsUpdateService,
    // private readonly storageService:StorageService,
    // private readonly factoryService:FactoryService,
    // private readonly regionService:RegionService,
    // private readonly manufacturerService:ManufacturerService,
    // private readonly categoryService:CategoryService,
    // private readonly unitService:UnitService
    ) { }

  ngOnInit(): void {

    this.headersTable=this.getHeadersTable(); 
    this.getProducts();    

    this.setProductsInfoLis();
    
  }

  filterCurrentProductsByTitle(researchString:string){
    this.productFilterForm.title=researchString;
    this.productsInfo = this.productsInfo
      .filter(product=>product.title.startsWith(researchString))
  }

  filterRefreshProductsByTitle(researchString:string){
    this.productFilterForm.title=researchString;
    console.log(this.productFilterForm)
    this.service.getByFilter(this.productFilterForm)
      .subscribe(products=>this.productsInfo=products)
  }

  toggleDetailedSearch(){
    if (!this.isApplyFilter) this.resetProductFilterForm();
    this.isOpenDetailedSearch=!this.isOpenDetailedSearch;   
  }  

  toFilterByCriteria(filterForm:ProductFilterForm){
  
    this.productFilterForm.regionId=filterForm.regionId;
    this.productFilterForm.factoryId = filterForm.factoryId;
    this.productFilterForm.storageId = filterForm.storageId;
    this.productFilterForm.manufacturerId = filterForm.manufacturerId;
    this.productFilterForm.categoryId = filterForm.categoryId;
    this.productFilterForm.unitId = filterForm.unitId;
    this.productFilterForm.startPrice = filterForm.startPrice;
    this.productFilterForm.endPrice = filterForm.endPrice;
    this.productFilterForm.startCount = filterForm.startCount;
    this.productFilterForm.endCount = filterForm.endCount;
    
    this.isApplyFilter=true;
    this.service.getByFilter(this.productFilterForm)
      .subscribe(products=>this.productsInfo=products)
  }

  resetFilterByCriteria(){
    this.isApplyFilter=false;
    this.resetProductFilterForm();
    this.service.getByFilter(this.productFilterForm)
      .subscribe(products=>this.productsInfo=products);
  }

  // clearFilterForm(){
  //   //this.getDataDetailedSearch();
  //   this.productFilterForm.startCount=0;
  //   this.productFilterForm.endCount=10000;
  //   this.productFilterForm.startPrice=0;
  //   this.productFilterForm.endPrice=10000;
  //   this.service.getByFilterByTitle(this.productFilterForm.title)
  //     .subscribe(product=>this.productsInfo=product);
  //   this.isApplyFilter=false;
  // }
  

  startEdit(editProduct:ProductInfo){

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
  }

  update(updateProduct:NewProductForm){
    this.updateService.updateProduct(updateProduct,this.editedProductId);    
  }

  closeEditPage(){
    this.setStatePage("",true)
    this.editedProductId=0;
  }

  openProductInfo(product:ProductInfo){
    this.setStatePage("productInfo",false);
    this.selectedProduct = product;
  }

  closeProductInfo(){
    this.setStatePage("",true);
  }
  sortCol(header:HeaderTable){
    console.log("sortBy");
    if (!header.isActive) return;
    let criteria = header.title;
    criteria===this._sortCriteria
      ? this._ascDirection *= -1
      : this._ascDirection = 1;
    
    this._sortCriteria=criteria;
    let orderedUsersInfo= this.productsInfo.sort((a:ProductInfo,b:ProductInfo)=>{
      let orderItemFirst=a[criteria];
      let orderItemSecond=b[criteria];
      const less = -1 * this._ascDirection;
      const more = 1 * this._ascDirection;

      if (typeof orderItemFirst === 'string') {
        return orderItemFirst.toLowerCase() <= orderItemSecond.toLowerCase() ? less : more;
      } else if (typeof orderItemFirst ==='number'){
        return orderItemFirst <= orderItemSecond ? less:more
      }  else {
        return orderItemFirst.title <= orderItemSecond.title ? less : more;
      }
      
    })
    this.productsInfo=orderedUsersInfo;
  }
  private setStatePage(path: string, isActive: boolean) {
    this.pageState={
      path:path,
      isActive:isActive
    }
  }

  private updateProducts(changes:number[]){
    console.log('updateProduct')
    if (changes.length===0) return;
    const isDoChanges = this.storages.some(storage=>changes.includes(storage.id));
    if (isDoChanges) this.getProducts(); 
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
    },{
      title:"view",
      isActive:false
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
        console.log(result); 
        this.productsInfo=result; 
        //this.updateFilterProductsInfo(this.productsInfo);       
        this.setStatePage("",true);
        
        
    },(err)=>{
      this.setStatePage("responce500",false);
    })
  }
  

  private setProductsInfoLis(){
    this.updateService.changesProductStorage$
      .subscribe((changes)=>{
        this.updateProducts(changes);  
    })

    this.updateMovementService.movementsProduct$
      .subscribe((changes)=>{
        this.updateProducts(changes);
      })
  }

  private resetProductFilterForm(){
    this.productFilterForm.regionId=0;
    this.productFilterForm.factoryId=0;
    this.productFilterForm.storageId=0;
    this.productFilterForm.manufacturerId=0;
    this.productFilterForm.categoryId=0;
    this.productFilterForm.unitId=0;
    this.productFilterForm.startCount=0;
    this.productFilterForm.endCount=10000;
    this.productFilterForm.startPrice=0;
    this.productFilterForm.endPrice=10000;
    
  }

}
