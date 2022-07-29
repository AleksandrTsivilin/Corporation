import { Component, OnDestroy, OnInit} from '@angular/core';
import { NewProductForm } from 'src/app/interfaces/product/newProductForm';
import { CategoryService } from 'src/app/services/productPage/CategoriesService/category.service';
import { ManufacturerService } from 'src/app/services/productPage/ManufacturersService/manufacturer.service';
import { UnitService } from 'src/app/services/productPage/UnitsService/unit.service';
import { ManufacturerInfo } from 'src/app/interfaces/product/manufacturerManagerPage/manufacturerInfo';
import { CategoryInfo } from 'src/app/interfaces/product/categoryManagerPage/categoryInfo';
import { UnitInfo } from 'src/app/interfaces/product/unitManagerPage/unitInfo';
import { ProductInfo } from 'src/app/interfaces/product/productsInfo';
import { TabService } from 'src/app/services/tab.service';
import { ProductsService } from 'src/app/services/productPage/products.service';
import { ModalInfo } from 'src/app/interfaces/modal';
import { Positions } from 'src/app/components/modals/modal/modal.component';
import { ProductUpdateService } from 'src/app/services/productPage/updateServices/product-update.service';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Subscription } from 'rxjs';
import { LoadingOptionProductEditPage } from 'src/app/interfaces/product/loadingOptionProductPage';
import { Routers } from 'src/app/enums/Router/routers'
import { ErrorLoadPage } from 'src/app/interfaces/errors/errors';
import { EditProductPageState } from 'src/app/interfaces/product/productsPageState';
import { ProductKeys } from 'src/app/enums/productPage/productKeys';




@Component({
  selector: 'app-edit-product',
  templateUrl:'./edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, OnDestroy{

  private titleTab = "editting";
  private removedTabSubscription = new Subscription();
  private querySubscription = new  Subscription();
  
  errorPage:ErrorLoadPage = {
    isErrorPage: false,
    statusCode:0
  }
  
  isOpenModal:boolean = false;

  modal:ModalInfo = {
    title: 'Are you sure that you want to leave page?',
    message: 'You should save data',
    position: Positions.topCenter
  }

  private productId:number = 0;
  private isHasTab : boolean = false;
  isChangedForm:boolean = false;
  isValidPrice:boolean=true;

  newProductForm:NewProductForm={
    storageId:0,
    title:"",
    price:0,
    count:0,
    manufacturerId:0,
    categoryId:0,
    unitId:0
  }

  manufacturers:ManufacturerInfo[]=[];
  categories:CategoryInfo[]=[];
  units:UnitInfo[]=[];

  loadingOptions : LoadingOptionProductEditPage={
    isComplitedLoadingPage:false,
    isComplitedLoadingManufacturers: false,
    isComplitedLoadingCategories: false,
    isComplitedLoadingUnits: false
  }
  

  constructor(
    private readonly manufacturerService:ManufacturerService,
    private readonly categoryServie:CategoryService,
    private readonly unitService:UnitService,
    private readonly localStorage: LocalStorageService,
    private readonly tabService:TabService,
    private readonly productService: ProductsService,
    private readonly updateService: ProductUpdateService,
    private readonly route: ActivatedRoute
    ) {}
  

  ngOnInit(): void {  
      
    this.routeQueryParamsSub();
    this.removedTabSub();     
  }  
  
  ngOnDestroy(): void {
    this.removedTabSubscription.unsubscribe();
    this.querySubscription.unsubscribe();
  }

  onSubmit(){    
    this.updateService
      .updateProduct(this.newProductForm,this.productId); 
    
      this.tabService.remove(this.titleTab);
  }

  close(){
    this.isOpenModal = true;    
  }

  closeModal(answer:boolean){
    if (answer) {
      this.tabService.remove(this.titleTab);
    }
      this.isOpenModal = false;
  }

  changedPrice(){
    this.hasChanges();
    const convertToNumber = Number(this.newProductForm.price);
    this.isValidPrice = convertToNumber>0;
    
  }

  hasChanges(){
    this.isChangedForm = true;
  }
  
  private getById(id:number){
    this.loadingOptions.isComplitedLoadingPage = true;
    this.productService.getById(id)
      .subscribe(product=>{
        this.loadingOptions.isComplitedLoadingPage = false;
        product 
          ? this.startSetting(product)
          : this.setErrorPage(404);
    },(err)=>{
      this.setErrorPage(err.status);
      this.loadingOptions.isComplitedLoadingPage = false;
    })
  }

  private startSetting(product : ProductInfo){

    this.createForm(product);
    this.productId = product.id;
    this.getSpecifications();
    this.createTab(product);
    this.saveData();
    
    
  } 

  private createTab(product : ProductInfo) {

    if (this.isHasTab) return;

    this.tabService.addedTab({
      title:this.titleTab,
      router: Routers.EDIT,
      additional: product.title
    }) 

  }

  private createForm(product:ProductInfo){

    this.newProductForm.title = product.title;
    this.newProductForm.manufacturerId = product.manufacturer.id;
    this.newProductForm.categoryId = product.category.id;
    this.newProductForm.unitId = product.unit.id;
    this.newProductForm.price = product.price;
  }

  private routeQueryParamsSub(){
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam:any)=>{
        const id = queryParam['id'];
        id 
          ? this.getById(id)
          : this.getProduct();   
      }
    )
  }

  private removedTabSub(){
    this.removedTabSubscription = this.tabService.removedTab$.subscribe(tab=>{
      if (tab.title === this.titleTab) this.clearData();
    })
  }

  private getProduct(){
    const product = history.state.product;
    product 
      ? this.startSetting(product)
      : this.getDataFromLocalStorage();
  }

  private getSpecifications(){
    this.getManufacturer();
    this.getCategories();
    this.getUnits();
  }

  private getManufacturer() {
    this.loadingOptions.isComplitedLoadingManufacturers = false;
    this.manufacturerService.getManufacturers()
      .subscribe((result)=>{
        this.manufacturers=result;
        this.loadingOptions.isComplitedLoadingManufacturers = true;
      },(err)=>{
        this.setErrorPage(err.status);
        this.loadingOptions.isComplitedLoadingManufacturers = true;        
      })
  }

  private getCategories() {
    this.loadingOptions.isComplitedLoadingCategories = false;
    this.categoryServie.getCategories()
      .subscribe((result)=>{
        this.categories=result;
        this.loadingOptions.isComplitedLoadingCategories = true;
      },(err)=>{
        this.setErrorPage(err.status);
        this.loadingOptions.isComplitedLoadingCategories = true;
      })
  }

  private getUnits() {
    this.loadingOptions.isComplitedLoadingUnits = false;
    this.unitService.getUnits()
      .subscribe((result)=>{
        this.units=result;
        this.loadingOptions.isComplitedLoadingUnits = true;
      },(err)=>{
        this.setErrorPage(err.status);
        this.loadingOptions.isComplitedLoadingUnits = true;
      })
  }

  private setErrorPage(statusCode:number){
    this.errorPage={
      isErrorPage: true,
      statusCode: statusCode
    }
  }


  private getDataFromLocalStorage(){
    const pageState = this.localStorage
      .get<EditProductPageState>(ProductKeys.EDIT);

      const id = pageState?.edit_id;
      if (id) {
        this.isHasTab = true;
        this.getById(id);
      }
      else this.setErrorPage(500);
  }

  private saveData(){

    this.localStorage.set(ProductKeys.EDIT,{
      edit_id : this.productId
    })
  }

  private clearData(){
    this.localStorage.remove(ProductKeys.EDIT);
  }
}
