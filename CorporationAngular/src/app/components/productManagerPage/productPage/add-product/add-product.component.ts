import { Component, Input, OnInit } from '@angular/core';
import { FormAddProduct } from 'src/app/interfaces/formAddProduct';
import { CategoryInfo } from 'src/app/interfaces/product/categoryManagerPage/categoryInfo';
import { ManufacturerInfo } from 'src/app/interfaces/product/manufacturerManagerPage/manufacturerInfo';
import { UnitInfo } from 'src/app/interfaces/product/unitManagerPage/unitInfo';
//import { Category, FormAddProduct, Manufacturer, Unit } from 'src/app/interfaces/formAddProduct';
import { StorageInfo } from 'src/app/interfaces/storageInfo';
import { CategoryService } from 'src/app/services/productPage/CategoriesService/category.service';
import { ManufacturerService } from 'src/app/services/productPage/ManufacturersService/manufacturer.service';
//import { Category, Manufacturer, Unit } from 'src/app/interfaces/productsInfo';
import { ProductsService } from 'src/app/services/productPage/products.service';
import { StorageService } from 'src/app/services/productPage/StoragesService/storage.service';
import { UnitService } from 'src/app/services/productPage/UnitsService/unit.service';
//import { SignalrProductService } from 'src/app/services/productPage/signalr-product.service';
import { ProductUpdateService } from 'src/app/services/productPage/updateServices/product-update.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @Input() storage:string="";

  formAddProduct:FormAddProduct={
    storage:"",
    title:"",
    price:0,
    avaiableCount:0,
    manufacturer:0, //{title:""} as Manufacturer,
    category:"", // {title:""} as Category,
    unit:"",// {title:""} as Unit
  }

  currentStorage:string="";
  manufacturers:ManufacturerInfo[]=[]; // Manufacturer[]=[];
  categories:CategoryInfo[]=[];// Category[]=[];
  units:UnitInfo[]=[]; // Unit[]=[];

  
  constructor(
   
    private readonly updateService:ProductUpdateService,
    private readonly manufacturerService:ManufacturerService,
    private readonly categoryService:CategoryService,
    private readonly unitService:UnitService,
    private readonly storageService:StorageService
    ) { }

  ngOnInit(): void {
    this.getCurrentStorage();
   
    
    console.log(this.formAddProduct.storage)
    this.getManufacturers();
    this.getCategories();
    this.getUnits();
    
  }

  onSubmit(){
    console.log(this.formAddProduct); 

    this.formAddProduct.storage=this.currentStorage; 
    
    // this.updateService.addProduct(this.formAddProduct);
    // this.formAddProduct={
    //   storage:this.formAddProduct.storage,
    //   title:"",
    //   manufacturer:0,
    //   category:"",
    //   unit:"",
    //   price:0,
    //   avaiableCount:0

    // }
  }

  private getCurrentStorage(){
    this.storageService.getStorageByUser()
      .subscribe((result)=>{
        console.log(result)
        this.currentStorage=result.title;
      },()=>{
        console.log("failed get storageByUser")
      })
  }

  private getManufacturers(){
    this.manufacturerService.getManufacturers()
      .subscribe((result)=>{
        this.manufacturers=result;
        console.log(this.manufacturers)
        
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

}
