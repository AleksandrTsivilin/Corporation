import { Component, OnInit, Output } from '@angular/core';
import { TableHeader } from 'src/app/interfaces/header-table';
import { ProductInfo } from 'src/app/interfaces/product/productsInfo';
import { StorageInfo } from 'src/app/interfaces/storageInfo';
import { ProductsService } from 'src/app/services/productPage/products.service';
import { StorageService } from 'src/app/services/productPage/StoragesService/storage.service';
import { ProductUpdateService } from 'src/app/services/productPage/updateServices/product-update.service';
import { MovementsUpdateService } from 'src/app/services/productPage/updateServices/movements-update.service';
import { FilterProductForm } from 'src/app/interfaces/product/productFilterForm';
import { LoadingOptionProductPage } from 'src/app/interfaces/product/loadingOptionProductPage';
import { Positions } from 'src/app/components/modals/modal/modal.component';
import { ModalInfo } from 'src/app/interfaces/modal';
import { UserExtraPermissions } from 'src/app/interfaces/auth/userPermissionsByRole';
import { AuthService } from 'src/app/services/auth.service';
import { PermissionInfo } from 'src/app/interfaces/userManagerPage/permissionInfo';
import { TabService } from 'src/app/services/tab.service';
import { ProductsPageState, TableProductsPageState } from 'src/app/interfaces/product/productsPageState';
import { TemplateFilter } from 'src/app/interfaces/product/templateFilter';
import { Routers } from 'src/app/enums/routers/routers';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductKeys } from 'src/app/enums/productPage/productKeys';



export const maxCount:number=300;
export const maxPrice:number=15000;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


  routers = Routers;
  @Output() userProductPermissions:UserExtraPermissions={    
    canUpdate:false,
    canDelete:false
  }  

  // productFilterForm:ProductFilterForm = {
  //   title:"",
  //   regionId:0,
  //   factoryId:0,
  //   storageId:0,
  //   manufacturerId:0,
  //   categoryId:0,
  //   unitId:0,
  //   startPrice:0,
  //   endPrice:maxPrice,
  //   startCount:0,
  //   endCount:maxCount
  // }

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

  //templateFilter: TemplateFilter | null = null;

  @Output() modalInfo:ModalInfo={
    title:"",
    message:"",
    position:Positions.center
  }

  //@Output() selectedTemplateId:number = 0;

  headersTable:TableHeader[]=[];
  productsInfo:ProductInfo[]=[];

  storages:StorageInfo[]=[];
 
  // newProductForm:NewProductForm={
  //   storageId:0,
  //   title:"",
  //   price:0,
  //   count:0,
  //   manufacturerId:0,
  //   categoryId:0,
  //   unitId:0
  // }

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
  //private isHasTab : boolean = false;
  
  loadingOptionProductPage:LoadingOptionProductPage={
    isComplitedSearchByCriteria:true,
    isComplitedSearchByTitle:true,
    isLoadingProducts:true
  }

  //private editedProductId:number=0;
  ascDirection = 1;
  sortCriteria="";
  private _isOrdered:boolean=false;
  

  pageState:ProductsPageState = {
    edit_id:0,
    table_open:false
  }
  
  constructor( 
    private readonly authService:AuthService,
    private readonly service:ProductsService,
    private readonly updateService:ProductUpdateService,
    private readonly updateMovementService:MovementsUpdateService,
    private readonly storageService:StorageService,
    private readonly tabService:TabService,
    private readonly localStorage: LocalStorageService
    ) { 

    //   this.createTab();

    //   this.loadPageState();

    //   console.log("const products")
   }

  ngOnInit(): void {

    //console.log("on init")

    const currentTemplate = history.state.template;

    // if (currentTemplate){
    //   this.createTab();
    //   this.startSetting(currentTemplate);
    // }
    // else{
    //   this.loadPageState();
    // }
    currentTemplate 
      ? this.startSetting(currentTemplate)
      : this.loadPageState();
    //const currentTemplate = this.getCurrentTemplate();

    //this.startSetting(currentTemplate);

    // this.loadProducts(currentTemplate);

    // this.getHeadersTable();    
      
    // this.getStorages(); 

    // this.setProductsInfoLis();  
    
    // this.subscribeTokenData();
  
  }

  // toggleTemplate(){
  //   //this.pageState.innerRouter = "template";
  // }

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
    this.loadProducts(filter);
    this.createTab();
  }

  loadProducts(filter:TemplateFilter | null){

    if (filter){   
      this.isApplyFilter = true;   
      this.filterProductForm.criteria = filter.criteria;
      this.templateFilter = filter;
    }
    else {
      this.isApplyFilter = false;
      this.resetCriteria();
      this.templateFilter.id=0;
      this.templateFilter.title = "new template"
    }
    this.savePageState();
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
    //this.productFilterForm.title=researchString;
    this.filterProductForm.searchString = researchString;
    this.loadingOptionProductPage.isComplitedSearchByTitle=false;
    this.productsInfo = this.productsInfo
      .filter(product=>product.title.startsWith(researchString))
    this.loadingOptionProductPage.isComplitedSearchByTitle=true;
    this.savePageState();
  }

  filterRefreshProductsByTitle(researchString:string){
    //this.productFilterForm.title=researchString;
    this.filterProductForm.searchString = researchString;
    this.loadingOptionProductPage.isComplitedSearchByTitle=false;
    this.getProductsByFilter();
    this.savePageState();
  }

  toggleDetailedSearch(){
    //console.log(this.templateFilter.criteria)
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

  // startEdit(editProduct:ProductInfo){

  //   this.editedProductId=editProduct.id;
  //   this.newProductForm={
  //     storageId:0,
  //     title:editProduct.title,
  //     price:editProduct.price,
  //     count:editProduct.count,
  //     manufacturerId:editProduct.manufacturer.id,
  //     categoryId:editProduct.category.id,
  //     unitId:editProduct.unit.id
  //   }

  //   this.savePageState("innerRouter", "/edit");
    
  // }

  remove(removeProduct:ProductInfo){
    this.updateService.remove(removeProduct.id);
  }

  // update(updateProduct:NewProductForm){
  //   this.updateService.updateProduct(updateProduct,this.editedProductId); 
  //   this.closeEditPage(); 

  // }

  // closeEditPage(){
  //   this.savePageState("innerRouter", "");
  //   this.editedProductId=0;
  // }

  openProductInfo(product:ProductInfo){
    //this.savePageState("innerRouter", "productInfo");
    this.selectedProduct = product;
  }

  closeProductInfo(){
    this.pageState.innerRouter=""
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
    this.savePageState();
  }

  
  // private setStatePage(path: string, isActive: boolean) {
  //   this.pageState={
  //     path:path,
  //     isActive:isActive
  //   }

  //   this.localStorageSevice.setSettingsProductsPage({innerRouter:path})
  // }

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
    if (this.isApplyFilter) this.getProductsByFilter();
    else {
      const searchString = this.filterProductForm.searchString;
      this.isEmptyString(searchString) 
        ? this.getProductsByDefault()
        : this.getProductsByTitle(searchString); 
    }
    // this.isApplyFilter
    //   ? this.getProductsByFilter()
    //   : this.getProductsByDefault();
    
    


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
        if (this._isOrdered) this.orderCol(this.sortCriteria);
        this.loadingComplited();
        //this.savePageState("innerRouter","")
        //this.pageState.innerRouter=""             
        
        // this.loadingOptionProductPage.isComplitedSearchByCriteria=true;
        // this.loadingOptionProductPage.isLoadingProducts = false;
    },(err)=>{

      //this.pageState.innerRouter="responce500";
      //this.savePageState("innerRouter","responce500")
    })
  }

  private getProductsByFilter(){
    this.service.getByFilter(this.filterProductForm)
      .subscribe(products=>{
        this.productsInfo=products;
        if (this._isOrdered) this.orderCol(this.sortCriteria);
        this.pageState.innerRouter="";
        this.loadingComplited();
        // this.loadingOptionProductPage.isComplitedSearchByCriteria=true;
        // this.loadingOptionProductPage.isComplitedSearchByTitle=true;
        // this.loadingOptionProductPage.isLoadingProducts = false;        
      })
  }

  private getProductsByTitle(searchString : string){
    
    this.service.getByFilterByTitle(searchString).subscribe(products=>{
      this.productsInfo = products;
      if (this._isOrdered) this.orderCol(this.sortCriteria);
      this.loadingComplited();
      // this.loadingOptionProductPage.isComplitedSearchByCriteria=true;
      // this.loadingOptionProductPage.isLoadingProducts = false;
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

  
  private loadPageState(){
    
    const pageState = this.localStorage.get<TableProductsPageState>(ProductKeys.TABLE);
    const template = pageState?.template;
    const ordered = pageState?.isOrdered;
    
    template
      ? this.startSetting(template)
      : this.startSetting(null);

    this.filterProductForm.searchString = pageState?.searchString 
      ? pageState?.searchString 
      : "";
    
    if (ordered) {
      this._isOrdered = ordered;
      this.sortCriteria = pageState?.sortCriteria ? pageState?.sortCriteria : "*";
      this.ascDirection = pageState?.ascDirection ? pageState?.ascDirection : 1;
    }
  }

  private startSetting(currentTemplate : TemplateFilter | null){

    this.loadProducts(currentTemplate);

    this.createTab();

    this.getHeadersTable();    
      
    this.getStorages(); 

    this.setProductsInfoLis();  
    
    this.subscribeTokenData();
  }

  private savePageState(){

    this.localStorage.set(ProductKeys.TABLE,{
       template : this.isApplyFilter ? this.templateFilter : null,
       searchString : this.filterProductForm.searchString,
       isOrdered :  this._isOrdered,
       sortCriteria : this.sortCriteria,
       ascDirection : this.ascDirection
    })
  }

  private createTab(){
    console.log("create product tab")
   
    this.tabService.addedTab(
      {
        title: "products",
        router: Routers.TABLE,
        additional: this.isApplyFilter
          ? this.templateFilter.title
          : "",
        key: ProductKeys.TABLE
      })
  }

  private isEmptyString(value : string ) : boolean{
    return value === "";
  }

  private loadingComplited(){
    this.loadingOptionProductPage = {
      isComplitedSearchByCriteria:true,
      isComplitedSearchByTitle:true,
      isLoadingProducts:false
    }
  }

  // private setErrorPage(statusCode:number){
  //   this.errorPage={
  //     isErrorPage: true,
  //     statusCode: statusCode
  //   }
  // }
}
