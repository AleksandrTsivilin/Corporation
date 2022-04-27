import { Component, Input, OnInit, Output } from '@angular/core';
import { AvaiablesPermissions } from 'src/app/interfaces/avaiablesPermissions';
import { HeaderTable } from 'src/app/interfaces/header-table';
import { PageState } from 'src/app/interfaces/pageState';
import { ProductInfo } from 'src/app/interfaces/product/productsInfo';
import { StorageInfo } from 'src/app/interfaces/storageInfo';
import { ProductsService } from 'src/app/services/productPage/products.service';
import { StorageService } from 'src/app/services/productPage/StoragesService/storage.service';
import { ProductUpdateService } from 'src/app/services/productPage/updateServices/product-update.service';
import { NewProductForm } from 'src/app/interfaces/product/newProductForm';
import { MovementsUpdateService } from 'src/app/services/productPage/updateServices/movements-update.service';
import { ProductFilterForm } from 'src/app/interfaces/product/productFilterForm';


export const maxCount:number=300;
export const maxPrice:number=15000;

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
    endPrice:maxPrice,
    startCount:0,
    endCount:maxCount
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
    private readonly storageService:StorageService
    ) { }

  ngOnInit(): void {
    this.headersTable=this.getHeadersTable(); 
    this.getProducts();  
    this.getStorages();  

    this.setProductsInfoLis();
    
  }

  filterCurrentProductsByTitle(researchString:string){
    this.productFilterForm.title=researchString;
    this.productsInfo = this.productsInfo
      .filter(product=>product.title.startsWith(researchString))
  }

  filterRefreshProductsByTitle(researchString:string){
    this.productFilterForm.title=researchString;
    this.service.getByFilter(this.productFilterForm)
      .subscribe(products=>this.productsInfo=products)
  }

  toggleDetailedSearch(){
    if (!this.isApplyFilter) this.resetProductFilterForm();
    this.isOpenDetailedSearch=!this.isOpenDetailedSearch;   
  }  

  toFilterByCriteria(filterForm:ProductFilterForm){
    this.productFilterForm=this.getProductFilterFormByCriteria(filterForm);    
    this.isApplyFilter=true;
    this.getProductsByFilter();
  }

  resetFilterByCriteria(){
    this.isApplyFilter=false;
    this.resetProductFilterForm();
    this.getProductsByFilter();
  }

  resetOptionFilterByCriteria(filter:ProductFilterForm){
    this.productFilterForm=this.getProductFilterFormByCriteria(filter);
    if (this.isEmptyProductFilterForm(filter)) this.isApplyFilter=false;
    this.getProductsByFilter();
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
    this.setStatePage("",true);   
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
    if (changes.length===0) return;
    const isDoChanges = this.storages.some(storage=>changes.includes(storage.id));
    if (isDoChanges) this.getProductsByFilter();
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
        this.productsInfo=result;        
        this.setStatePage("",true);
        
        
    },(err)=>{
      this.setStatePage("responce500",false);
    })
  }

  private getProductsByFilter(){
    this.service.getByFilter(this.productFilterForm)
      .subscribe(products=>{
        this.productsInfo=products
      })
  }

  private getStorages(){
    this.storageService.getStoragesByAccess("ProductManager")
      .subscribe(storages=>{
        this.storages=storages
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

  private getProductFilterFormByCriteria(filterForm:ProductFilterForm) : ProductFilterForm{
    const title = filterForm.title;
    return {
      title : title,
      regionId : filterForm.regionId,
      factoryId : filterForm.factoryId,
      storageId : filterForm.storageId,
      manufacturerId : filterForm.manufacturerId,
      categoryId : filterForm.categoryId,
      unitId : filterForm.unitId,
      startPrice : filterForm.startPrice,
      endPrice : filterForm.endPrice,
      startCount : filterForm.startCount,
      endCount : filterForm.endCount
    }
  }
  private resetProductFilterForm(){
    this.productFilterForm.regionId=0;
    this.productFilterForm.factoryId=0;
    this.productFilterForm.storageId=0;
    this.productFilterForm.manufacturerId=0;
    this.productFilterForm.categoryId=0;
    this.productFilterForm.unitId=0;
    this.productFilterForm.startCount=0;
    this.productFilterForm.endCount=maxCount;
    this.productFilterForm.startPrice=0;
    this.productFilterForm.endPrice=maxPrice;
    
  }

  private isEmptyProductFilterForm(form : ProductFilterForm):boolean{
    return !this.isDefaultValue(form.regionId)
        || !this.isDefaultValue(form.factoryId)
        || !this.isDefaultValue(form.storageId)
        || !this.isDefaultValue(form.manufacturerId)
        || !this.isDefaultValue(form.categoryId)
        || !this.isDefaultValue(form.unitId)
        || !this.isDefaultValue(form.startCount)
        || form.endCount !=maxCount
        || !this.isDefaultValue(form.startPrice)
        || form.endPrice !=maxPrice
        ? false : true;


    
  }

  private isDefaultValue(value:Number) : boolean{
    return value==0;
  }

}
