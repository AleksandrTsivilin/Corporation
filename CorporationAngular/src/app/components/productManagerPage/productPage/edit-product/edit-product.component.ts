import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageState } from 'src/app/interfaces/pageState';
import { NewProductForm } from 'src/app/interfaces/product/newProductForm';
import { CategoryService } from 'src/app/services/productPage/CategoriesService/category.service';
import { ManufacturerService } from 'src/app/services/productPage/ManufacturersService/manufacturer.service';
import { ProductsService } from 'src/app/services/productPage/products.service';
import { UnitService } from 'src/app/services/productPage/UnitsService/unit.service';
import { ManufacturerInfo } from 'src/app/interfaces/product/manufacturerManagerPage/manufacturerInfo';
import { CategoryInfo } from 'src/app/interfaces/product/categoryManagerPage/categoryInfo';
import { UnitInfo } from 'src/app/interfaces/product/unitManagerPage/unitInfo';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  @Input() newProductForm:NewProductForm={
    storageId:0,
    title:"",
    price:0,
    count:0,
    manufacturerId:0,
    categoryId:0,
    unitId:0
  }

  @Output() updateProduct=new EventEmitter();
  @Output() close=new EventEmitter();


  pageState:PageState={
    path:"",
    isActive:true
  }
  manufacturers:ManufacturerInfo[]=[];
  categories:CategoryInfo[]=[];
  units:UnitInfo[]=[];
  
  isValidPrice:boolean=true;
  constructor(
    private readonly manufacturerService:ManufacturerService,
    private readonly categoryServie:CategoryService,
    private readonly unitService:UnitService
    ) { 
    
  }

  ngOnInit(): void {
    
    this.getManufacturer();
    this.getCategories();
    this.getUnits();
  }

  

  onSubmit(){
    this.updateProduct.emit(this.newProductForm);
  }

  closeEditPage(){
    this.close.emit();
  }

  changedPrice(){
    const convertToNumber = Number(this.newProductForm.price);
    this.isValidPrice = convertToNumber>0;
    
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

}
