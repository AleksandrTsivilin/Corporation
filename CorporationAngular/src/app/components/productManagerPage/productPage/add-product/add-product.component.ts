import { Component, Input, OnInit } from '@angular/core';
import { CategoryInfo } from 'src/app/interfaces/product/categoryManagerPage/categoryInfo';
import { ManufacturerInfo } from 'src/app/interfaces/product/manufacturerManagerPage/manufacturerInfo';
import { UnitInfo } from 'src/app/interfaces/product/unitManagerPage/unitInfo';
import { NewProductForm } from 'src/app/interfaces/product/newProductForm';
import { StorageInfo } from 'src/app/interfaces/storageInfo';
import { CategoryService } from 'src/app/services/productPage/CategoriesService/category.service';
import { ManufacturerService } from 'src/app/services/productPage/ManufacturersService/manufacturer.service';
import { ProductsService } from 'src/app/services/productPage/products.service';
import { StorageService } from 'src/app/services/productPage/StoragesService/storage.service';
import { UnitService } from 'src/app/services/productPage/UnitsService/unit.service';
import { ProductUpdateService } from 'src/app/services/productPage/updateServices/product-update.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @Input() storage:string="";

  
  newProductForm:NewProductForm={
    storageId:0,
    title:"",
    count:0,
    price:0,
    manufacturerId:0,
    categoryId:0,
    unitId:0
  }
  

  currentStorage:StorageInfo={
    id:0,
    title:""
  };
  manufacturers:ManufacturerInfo[]=[]; 
  categories:CategoryInfo[]=[];
  units:UnitInfo[]=[]; 

  
  constructor(
   
    private readonly updateService:ProductUpdateService,
    private readonly manufacturerService:ManufacturerService,
    private readonly categoryService:CategoryService,
    private readonly unitService:UnitService,
    private readonly storageService:StorageService
    ) { }

  ngOnInit(): void {
    this.getCurrentStorage();
   
    this.getManufacturers();
    this.getCategories();
    this.getUnits();
    
  }

  onSubmit(){
    this.newProductForm.storageId=this.currentStorage.id; 
    console.log(this.newProductForm); 

    
    
    this.updateService.addProduct(this.newProductForm);
    this.newProductForm={
      storageId:this.newProductForm.storageId,
      title:"",
      manufacturerId:0,
      categoryId:0,
      unitId:0,
      price:0,
      count:0

    }
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

}
