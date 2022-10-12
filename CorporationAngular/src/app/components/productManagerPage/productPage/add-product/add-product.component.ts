import { Component, Input, OnInit } from '@angular/core';
import { CategoryInfo } from 'src/app/interfaces/product/categoryManagerPage/categoryInfo';
import { ManufacturerInfo } from 'src/app/interfaces/product/manufacturerManagerPage/manufacturerInfo';
import { UnitInfo } from 'src/app/interfaces/product/unitManagerPage/unitInfo';
import { NewProductForm } from 'src/app/interfaces/product/newProductForm';
import { StorageInfo } from 'src/app/interfaces/storageInfo';
import { CategoryService } from 'src/app/services/productPage/CategoriesService/category.service';
import { ManufacturerService } from 'src/app/services/productPage/ManufacturersService/manufacturer.service';
import { StorageService } from 'src/app/services/productPage/StoragesService/storage.service';
import { UnitService } from 'src/app/services/productPage/UnitsService/unit.service';
import { ProductUpdateService } from 'src/app/services/productPage/updateServices/product-update.service';
import { TabService } from 'src/app/services/tab.service';
import { FormValidationMessage } from 'src/app/enums/formValidationMessage/formValidationMessage';
import { FormValidator } from 'src/app/interfaces/formValidation/formValidation';
import { FormRegExp } from 'src/app/enums/regExp';
import { ProductTitlePage } from 'src/app/enums/productPage/productTitlePage';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @Input() storage:string="";

  formsMessage = FormValidationMessage ;
  regExpStr = FormRegExp;
  titlePage = ProductTitlePage;
  
  newProductForm: NewProductForm = {
    storageId: 0,
    title: null,
    count: null,
    price: null,
    manufacturerId: null,
    categoryId: null,
    unitId: null
  }

  currentStorage:StorageInfo={
    id:0,
    title:""
  };
  manufacturers:ManufacturerInfo[]=[]; 
  categories:CategoryInfo[]=[];
  units:UnitInfo[]=[]; 

  priceErrorMessage : string | undefined;
  countErrorMessage : string | undefined;
  titleErrorMessage : string | undefined;
  isValidForm = true;

  countValidator : any ;

  
  
  
  constructor(
   
    private readonly updateService:ProductUpdateService,
    private readonly manufacturerService:ManufacturerService,
    private readonly categoryService:CategoryService,
    private readonly unitService:UnitService,
    private readonly storageService:StorageService,
    private readonly tabService:TabService
    ) {}

  ngOnInit(): void {

    this.createTab();
    this.getCurrentStorage();
   
    this.getManufacturers();
    this.getCategories();
    this.getUnits();
    
    this.checkForm();
  }

  close(){
    this.tabService.remove(this.titlePage.ADD_PRODUCT)
  }
  onSubmit(){

    this.newProductForm.storageId=this.currentStorage.id;      
    
    this.updateService.addProduct(this.newProductForm);   
  }

  validHandler(responce:FormValidator, key:string){
    switch (key){
      case 'count' : 
        this.newProductForm.count = responce.prevState ?  Number(responce.prevState) : null;
        this.countErrorMessage = responce.message; 
        break;
      case 'price' : 
        this.newProductForm.price = responce.prevState ?  Number(responce.prevState) : null;
        this.priceErrorMessage = responce.message; 
        break;
      case 'title' : 
        this.newProductForm.title = responce.prevState;
        this.titleErrorMessage = responce.message;
        break;

      default: break;
    }

    this.checkForm();    
  }

  private checkForm(){
    this.isValidForm = !(this.countErrorMessage) && !(this.priceErrorMessage) && !(this.titleErrorMessage);
  }
  
  
  private getCurrentStorage(){
    this.storageService.getStorageByUser("ProductManager")
      .subscribe((result)=>{
        this.currentStorage=result;
      },()=>{
        console.log("failed get storageByUser")
      })
  }

  private getManufacturers(){
    this.manufacturerService.getManufacturers()
      .subscribe((result)=>{
        this.manufacturers=result;        
      },()=>{
        console.log("failed get manufacturers")
      })
  
  }

  private getCategories(){
    this.categoryService.getCategories()
      .subscribe((result)=>{
        this.categories=result;
        
      },()=>{
        console.log("failed get manufacturers")
      })
  }

  private getUnits(){
    this.unitService.getUnits()
      .subscribe((result)=>{
        this.units=result;
        
      },()=>{
        console.log("failed get manufacturers")
      })
  }

  private createTab(){
    this.tabService.addedTab({
      title: this.titlePage.ADD_PRODUCT,
      router: "/services/addProduct",
      additional: "",
      key: undefined
    })
  }
}
