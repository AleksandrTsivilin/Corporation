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
  search:string="";
  filterProductsInfo:ProductInfo[]=[];

  storages:StorageInfo[]=[];
  factories: FactoryInfo[]=[];
  regions: RegionInfo[]=[];
  manufacturers:ManufacturerInfo[]=[];
  categories:CategoryInfo[]=[];
  units:UnitInfo[]=[];

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
  
  private search$=new BehaviorSubject<string>("");


  pageState:PageState={
    path:"loadingPage",
    isActive:false
  }
  
  constructor( 
    private readonly service:ProductsService,
    private readonly updateService:ProductUpdateService,
    private readonly updateMovementService:MovementsUpdateService,
    private readonly storageService:StorageService,
    private readonly factoryService:FactoryService,
    private readonly regionService:RegionService,
    private readonly manufacturerService:ManufacturerService,
    private readonly categoryService:CategoryService,
    private readonly unitService:UnitService
    ) { }

  ngOnInit(): void {

    this.headersTable=this.getHeadersTable(); 
    this.getProducts();    

    this.setProductsInfoLis();
    
    this.setDefaultSearch();
  }

  startSearch(){
    this.search$.next(this.search);
  }

  toggleDetailedSearch(){
    this.isOpenDetailedSearch=!this.isOpenDetailedSearch;
    if (this.isApplyFilter) return;
    if (this.isOpenDetailedSearch) this.getDataDetailedSearch();    
  }  

  onSubmitFilter(){
    console.log(this.productFilterForm)
    this.isApplyFilter=true;
    this.service.getByFilter(this.productFilterForm)
      .subscribe(products=>this.filterProductsInfo=products)
  }
  clearFilterForm(){
    this.getDataDetailedSearch();
    this.productFilterForm.startCount=0;
    this.productFilterForm.endCount=10000;
    this.productFilterForm.startPrice=0;
    this.productFilterForm.endPrice=10000;
    console.log(this.productFilterForm);
    this.service.getProductsByAccess()
      .subscribe(product=>this.filterProductsInfo=product);
    this.isApplyFilter=false;
  }
  changeFilterRegion(){
    console.log(this.productFilterForm)
    const selectedRegionId=Number(this.productFilterForm.regionId);
    console.log(selectedRegionId);
    this.factoryService.getFactoryByRegionId(selectedRegionId)
      .subscribe(factories=>{
        this.factories=factories;
        this.productFilterForm.factoryId=this.clearValueForm(this.productFilterForm.factoryId);
        //this.productFilterForm.factoryId=this.productFilterForm.factoryId-1;
  })
    
  this.storageService.getStorageByRegionId(selectedRegionId)
    .subscribe(storages=>{
      this.storages=storages;
      this.productFilterForm.storageId=this.clearValueForm(this.productFilterForm.storageId);
      //this.productFilterForm.storageId=this.productFilterForm.storageId-1;
    })
  }

  changeFilterFactory(){
    console.log("changeFilterFactory")
    console.log(this.factories)
    const selectedFactoryId=Number(this.productFilterForm.factoryId);
    this.storageService.getStoragesByFactoryId(selectedFactoryId)
      .subscribe(storages=>{
        this.storages=storages;
        //this.productFilterForm.storageId=this.productFilterForm.storageId-1;
        Number(this.productFilterForm.storageId)>0
          ? this.productFilterForm.storageId=0
          : this.productFilterForm.storageId=this.productFilterForm.storageId-1;
      })
  }
  changeFilterStartPrice(startPrice:number){
    if (startPrice>this.productFilterForm.endPrice) 
      this.productFilterForm.endPrice=startPrice+1;
    this.productFilterForm.startPrice=startPrice;
  }
  changeFilterEndPrice(endPrice:number){
    if(endPrice<this.productFilterForm.startPrice)
      this.productFilterForm.startPrice=endPrice-1;
    this.productFilterForm.endPrice=endPrice;
  }

  changeFilterStartCount(startCount:number){
    if(startCount>this.productFilterForm.endCount)
      this.productFilterForm.endCount=startCount+1;
    this.productFilterForm.startCount=startCount;
  }

  changeFilterEndCount(endCount:number){
    if(endCount<this.productFilterForm.startCount)
      this.productFilterForm.startCount=endCount-1;
    this.productFilterForm.endCount=endCount;
  }

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
    console.log(this.selectedProduct)
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
    let orderedUsersInfo= this.filterProductsInfo.sort((a:ProductInfo,b:ProductInfo)=>{
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
    this.filterProductsInfo=orderedUsersInfo;
  }
  private setStatePage(path: string, isActive: boolean) {
    this.pageState={
      path:path,
      isActive:isActive
    }
  }

  private updateProducts(changes:number[]){
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
        this.updateFilterProductsInfo(this.productsInfo);       
        this.setStatePage("",true);
        
        
    },(err)=>{
      this.setStatePage("responce500",false);
    })
  }
  private getDataDetailedSearch(){
    this.getStorages();
    this.getFactories();
    this.getRegions();
    this.getManufacturers();
    this.getCategories();
    this.getUnits();
  }
  private getStorages(){
    this.storageService.getStoragesByAccess("ProductManager")
      .subscribe(storages=>{
        this.storages=storages;
        this.productFilterForm.storageId=this.clearValueForm(this.productFilterForm.storageId);
      })
  }

  private getFactories(){
    this.factoryService.getFactoriesByAcces()
      .subscribe(factories=>{
        this.factories=factories;
        this.productFilterForm.factoryId=this.clearValueForm(this.productFilterForm.factoryId);
      })
  }

  private getRegions(){
    this.regionService.getRegionsByAccess()
      .subscribe(regions=>{
        this.regions = regions;
        this.productFilterForm.regionId=this.clearValueForm(this.productFilterForm.regionId);
      })
  }

  private getManufacturers(){
    this.manufacturerService.getManufacturers()
      .subscribe(manufacturers=>{
        this.manufacturers=manufacturers;
        this.productFilterForm.manufacturerId=this.clearValueForm(this.productFilterForm.manufacturerId);
      })
  }

  private getCategories(){
    this.categoryService.getCategories()
      .subscribe(categories=>{
        this.categories=categories;
        this.productFilterForm.categoryId=this.clearValueForm(this.productFilterForm.categoryId);
      })
  }

  private getUnits(){
    this.unitService.getUnits()
      .subscribe(units=>{
        this.units=units;
        this.productFilterForm.unitId=this.clearValueForm(this.productFilterForm.unitId);
      })
  }

  private setDefaultSearch(){
    this.search$.pipe(
      
      debounceTime(1000))
      .subscribe(res=>{
        this.filterProductsInfo=this.productsInfo
          .filter(product=>product.title.startsWith(res));
      });
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

  private updateFilterProductsInfo(products:ProductInfo[]){
    this.search$.value===""
      ? this.filterProductsInfo=products
      : products.map(product=>{
        this.filterProductsInfo = this.filterProductsInfo
          .map(filteredUser=>{
            return product.id === filteredUser.id
              ? product
              : filteredUser;
          })
      })
  }

  private clearValueForm(value:number):number{
    return value>0
      ? 0
      : value-1;
  }

}
