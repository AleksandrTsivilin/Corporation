import { Component, OnInit, Output } from '@angular/core';
import { TableHeader } from 'src/app/interfaces/header-table';
import { PageState } from 'src/app/interfaces/pageState';
import { ProductInfo } from 'src/app/interfaces/product/productsInfo';
import { StorageInfo } from 'src/app/interfaces/storageInfo';
import { ProductsService } from 'src/app/services/productPage/products.service';
import { StorageService } from 'src/app/services/productPage/StoragesService/storage.service';
import { ProductUpdateService } from 'src/app/services/productPage/updateServices/product-update.service';
import { NewProductForm } from 'src/app/interfaces/product/newProductForm';
import { MovementsUpdateService } from 'src/app/services/productPage/updateServices/movements-update.service';
import { FilterProductForm, ProductFilterForm } from 'src/app/interfaces/product/productFilterForm';
import { LoadingOptionProductPage } from 'src/app/interfaces/product/loadingOptionProductPage';
import { Positions } from 'src/app/components/modals/modal/modal.component';
import { ModalInfo } from 'src/app/interfaces/modal';
import { UserExtraPermissions } from 'src/app/interfaces/auth/userPermissionsByRole';
import { AuthService } from 'src/app/services/auth.service';
import { PermissionInfo } from 'src/app/interfaces/userManagerPage/permissionInfo';
import { TabService } from 'src/app/services/tab.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductsPageState } from 'src/app/interfaces/product/productsPageState';
import { TemplateFilter } from 'src/app/interfaces/product/templateFilter';


export const maxCount:number=300;
export const maxPrice:number=15000;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Output() userProductPermissions:UserExtraPermissions={    
    canUpdate:false,
    canDelete:false
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

  filterProductForm:FilterProductForm = {
    searchString: "",
    criteria:{
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
  }

  templateFilter:TemplateFilter={
    id:0,
    title:"new template",
    criteria:{
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
  }

  @Output() modalInfo:ModalInfo={
    title:"",
    message:"",
    position:Positions.center
  }

  @Output() selectedTemplateId:number = 0;

  headersTable:TableHeader[]=[];
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
  
  isOpenDetailedSearch:boolean =false;
  isApplyFilter:boolean=false;
  isShowModalWarning=false;
  
  loadingOptionProductPage:LoadingOptionProductPage={
    isComplitedSearchByCriteria:true,
    isComplitedSearchByTitle:true,
    isLoadingProducts:false
  }

  private editedProductId:number=0;
  ascDirection = 1;
  sortCriteria="";
  private _isOrdered:boolean=false;
  

  pageState:PageState={
    path:"templatePage",
    isActive:false
  }

  _pageState:ProductsPageState={
    innerRouter:"templatePage"
  }
  
  constructor( 
    private readonly authService:AuthService,
    private readonly service:ProductsService,
    private readonly updateService:ProductUpdateService,
    private readonly updateMovementService:MovementsUpdateService,
    private readonly storageService:StorageService,
    private readonly tabService:TabService,
    private readonly localStorageSevice:LocalStorageService
    ) { 

      tabService.addedTab(
        {
          title:"products",
          router:'/services/products'
        })

      const state =  this.localStorageSevice.getSettingsProductsPage();
      if (state !==null) {
        this.pageState.path = state.innerRouter;       
      }
    }

  ngOnInit(): void {

    
    this.getHeadersTable(); 
    this.getStorages(); 

    this.setProductsInfoLis();  
    
    this.subscribeTokenData();

    
  }

  toggleTemplate(){
    this.pageState.path = 'template'
  }

  applyCriteria(filter:TemplateFilter | null){
    this.isOpenDetailedSearch=false;
    // filter ===null 
    //   ? this.resetProductFilterForm()
    //   : this.templateFilter = filter;
    // filterForm===null
    //   ? this.resetProductFilterForm()
    //   : this.setProductFilterFormByCriteria(filterForm);
    
    
    //this.isApplyFilter = filter !== null;    
    this.loadingOptionProductPage.isComplitedSearchByCriteria=false;
    this.loadProducts(filter)
  }

  loadProducts(filter:TemplateFilter | null){
    console.log(filter)
    this.pageState.path="";
    this.isApplyFilter = filter !== null;
    if (filter !==null){      
      this.filterProductForm.criteria = filter.criteria;
      this.templateFilter = filter;
    }
    else {
      this.resetCriteria();
      this.templateFilter.id=0;
      this.templateFilter.title = "new template"
    }
    
    this.getProducts();
  }

  subscribeTokenData(){
    this.authService.tokenData$.subscribe(tokenData=>{
      let permissions = tokenData?.avaiables
        .filter(avaiable=>avaiable.role.title==='ProductManager')[0]?.permissions;
      
      if (!permissions) return;
      
      this.userProductPermissions.canUpdate=this.isHasUpdate(permissions);
      this.userProductPermissions.canDelete=this.isHasDelete(permissions);
      this.getHeadersTable();
    })
  }

  filterCurrentProductsByTitle(researchString:string){
    console.log("filter by title")
    this.productFilterForm.title=researchString;
    this.loadingOptionProductPage.isComplitedSearchByTitle=false;
    this.productsInfo = this.productsInfo
      .filter(product=>product.title.startsWith(researchString))
    this.loadingOptionProductPage.isComplitedSearchByTitle=true;
  }

  filterRefreshProductsByTitle(researchString:string){
    this.productFilterForm.title=researchString;
    this.loadingOptionProductPage.isComplitedSearchByTitle=false;
    this.getProductsByFilter();
  }

  toggleDetailedSearch(){
    console.log(this.templateFilter.criteria)
    if (this.isOpenDetailedSearch) {
      this.modalInfo={
        title:"Are you sure close filter menu",
        message:"You should save data",
        position:Positions.center
      }
      this.isShowModalWarning=true;
      return
    }
    
    this.isOpenDetailedSearch=!this.isOpenDetailedSearch;   
  }  
              
  closeWarningModal(answer:boolean){
    if (answer) {
      
      if (!this.isApplyFilter) this.resetCriteria();
      this.isOpenDetailedSearch=!this.isOpenDetailedSearch;  
    }
    this.isShowModalWarning=false;
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
    this.closeEditPage(); 

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

  startOrderBy(header:TableHeader, direction:number){
    if (!header.isOrdered) return;
    this.sortCriteria = header.title;
    this.ascDirection = direction;
    this.orderCol(this.sortCriteria);
  }

  private orderCol(criteria:string){
    this.productsInfo = this.productsInfo.sort((a:ProductInfo,b:ProductInfo)=>{
      let orderItemFirst=a[criteria];
      let orderItemSecond=b[criteria];
      const less = -1 * this.ascDirection;
      const more = 1 * this.ascDirection;

      if (typeof orderItemFirst === 'string') {
        return orderItemFirst.toLowerCase() <= orderItemSecond.toLowerCase() ? less : more;
      } else if (typeof orderItemFirst ==='number'){
        return orderItemFirst <= orderItemSecond ? less:more
      }  else {
        return orderItemFirst.title <= orderItemSecond.title ? less : more;
      }
      
    })
    this._isOrdered = true;
  }

  
  private setStatePage(path: string, isActive: boolean) {
    this.pageState={
      path:path,
      isActive:isActive
    }

    this.localStorageSevice.setSettingsProductsPage({innerRouter:path})
  }

  private updateProducts(changes:number[]){
    if (changes.length===0) return;
    const isDoChanges = this.storages.some(storage=>changes.includes(storage.id));
    if (isDoChanges) this.getProductsByFilter();
  }

  private getHeadersTable(){
    
    const headers= [{
      title:'#',
      isOrdered:false
    },
    {
      title:"title",
      isOrdered:true
    },{
      title:"manufacturer",
      isOrdered:true
    },{
      title:"category",
      isOrdered:true
    },{
      title:"count",
      isOrdered:true
    },{
      title:"unit",
      isOrdered:true
    },{
      title:"price",
      isOrdered:true
    },{
      title:"details",
      isOrdered:false
    }];

    // if (this.avaiablesPermissions.canUpdate) {
    //   headers.push({title:"edit",isActive:false});
    // }

    // if (this.avaiablesPermissions.canDelete) {
    //   headers.push({title:"delete",isActive:false})
    // }
    
    if (this.userProductPermissions.canUpdate) headers.push({title:"edit",isOrdered:false});

    if (this.userProductPermissions.canDelete) headers.push({title:"delete", isOrdered:false})

    this.headersTable=headers;
  }

  private isHasUpdate(permissions:PermissionInfo[]){
    return permissions?.map(permission=>permission.title).includes('Update');
  }

  private isHasDelete(permissions:PermissionInfo[]){
    return permissions?.map(permission=>permission.title).includes('Delete');
  }

  private getProducts(){
    //this.setStatePage("loadingPage",false)    
    this.loadingOptionProductPage.isLoadingProducts=true;
    this.isApplyFilter
      ? this.getProductsByFilter()
      : this.getProductsByDefault();
    // if (this.isEmptyProductFilterForm(this.productFilterForm)){
    //   this.getProductsByDefault(); 
    //   console.log(this.pageState.path)     
    // }
    // else{
    //   this.getProductsByFilter();
    //   this.isApplyFilter=true;
    // }
  }

  private getProductsByDefault(){
      this.service.getProductsByAccess()
      .subscribe((result)=>{       
        this.productsInfo=result;              
        this.setStatePage("",true);
        this.loadingOptionProductPage.isComplitedSearchByCriteria=true;
        this.loadingOptionProductPage.isLoadingProducts = false;
    },(err)=>{
      this.setStatePage("responce500",false);
    })
  }

  private getProductsByFilter(){
    this.service.getByFilter(this.filterProductForm)
      .subscribe(products=>{
        this.productsInfo=products
        this.setStatePage("",true);
        this.loadingOptionProductPage.isComplitedSearchByCriteria=true;
        this.loadingOptionProductPage.isComplitedSearchByTitle=true;
        this.loadingOptionProductPage.isLoadingProducts = false;
        if (this._isOrdered) this.orderCol(this.sortCriteria);
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

  private resetCriteria(){
    this.filterProductForm.criteria.regionId=0;
    this.filterProductForm.criteria.factoryId=0;
    this.filterProductForm.criteria.storageId=0;
    this.filterProductForm.criteria.manufacturerId=0;
    this.filterProductForm.criteria.categoryId=0;
    this.filterProductForm.criteria.unitId=0;
    this.filterProductForm.criteria.startCount=0;
    this.filterProductForm.criteria.endCount=maxCount;
    this.filterProductForm.criteria.startPrice=0;
    this.filterProductForm.criteria.endPrice=maxPrice;

     
  }
}
