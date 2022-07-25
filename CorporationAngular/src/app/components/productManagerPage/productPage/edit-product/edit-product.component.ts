import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NewProductForm } from 'src/app/interfaces/product/newProductForm';
import { CategoryService } from 'src/app/services/productPage/CategoriesService/category.service';
import { ManufacturerService } from 'src/app/services/productPage/ManufacturersService/manufacturer.service';
import { UnitService } from 'src/app/services/productPage/UnitsService/unit.service';
import { ManufacturerInfo } from 'src/app/interfaces/product/manufacturerManagerPage/manufacturerInfo';
import { CategoryInfo } from 'src/app/interfaces/product/categoryManagerPage/categoryInfo';
import { UnitInfo } from 'src/app/interfaces/product/unitManagerPage/unitInfo';
import { ProductLocalStorageService } from 'src/app/services/productPage/product-local-storage.service';
import { ProductInfo } from 'src/app/interfaces/product/productsInfo';
import { TabService } from 'src/app/services/tab.service';
import { ProductsService } from 'src/app/services/productPage/products.service';
import { ModalInfo } from 'src/app/interfaces/modal';
import { Positions } from 'src/app/components/modals/modal/modal.component';
import { ProductUpdateService } from 'src/app/services/productPage/updateServices/product-update.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit{

  private router = "/edit";
  private titleTab = "editting";
  
  isErrorPage:boolean = false;
  isLoading:boolean = false;
  isOpenModal:boolean = false;

  modal:ModalInfo = {
    title: 'Are you sure that you want to leave page?',
    message: 'You should save data',
    position: Positions.topCenter
  }

  private productId:number = 0;
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
  
  

  constructor(
    private readonly manufacturerService:ManufacturerService,
    private readonly categoryServie:CategoryService,
    private readonly unitService:UnitService,
    private readonly localStorage:ProductLocalStorageService,
    private readonly tabService:TabService,
    private readonly productService: ProductsService,
    private readonly updateService: ProductUpdateService
    ) { 
      
      this.loadDataPage();
  }
  

  ngOnInit(): void {
    
    this.getManufacturer();
    this.getCategories();
    this.getUnits();
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
    if (answer) this.tabService.remove(this.titleTab);
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
  
  private getManufacturer() {
    this.manufacturerService.getManufacturers()
      .subscribe((result)=>{
        this.manufacturers=result;
      },()=>{console.log("failed getManufacturer editProduct")})
  }

  private getCategories() {
    this.categoryServie.getCategories()
      .subscribe((result)=>{
        this.categories=result;
      },()=>{console.log("failed getCategories editProduct")})
  }

  private getUnits() {
    this.unitService.getUnits()
      .subscribe((result)=>{
        this.units=result;
      },()=>{console.log("failed getUnits editProduct")})
  }
  
  private loadDataPage(){
    const product = history.state.product;

    if (product) {
      this.startSetting(product);
      return;
    }

    const id = this.localStorage.get("edit_id");

    if (id) {
      this.getById(id);
      return;
    }

    this.isErrorPage = true;
  }

  private getById(id:number){
    this.isLoading = true;
    this.productService.getById(id)
      .subscribe(product=>{
        this.loadingCompleted();
        product 
          ? this.startSetting(product)
          : this.isErrorPage = true;
    },()=>{
      this.isErrorPage = true;
      this.isLoading = false;
    })
  }

  private startSetting(product : ProductInfo){

    this.productId = product.id;
 
    this.localStorage.set("edit_id", product.id);

    this.createTab(product);

    this.createForm(product);
  } 

  private createTab(product : ProductInfo){
    this.tabService.addedTab({
      title:this.titleTab,
      router:"/services/products/edit",
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

  private loadingCompleted(){
    setTimeout(()=> this.isLoading = false,300);    
  }
}
