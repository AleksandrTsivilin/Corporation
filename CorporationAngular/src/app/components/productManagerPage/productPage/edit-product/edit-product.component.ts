import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category, FormAddProduct, Manufacturer, Unit } from 'src/app/interfaces/formAddProduct';
import { PageState } from 'src/app/interfaces/pageState';
import { NewProductForm } from 'src/app/interfaces/productManagerPage/newProductForm';
import { ProductInfo } from 'src/app/interfaces/productManagerPage/productsInfo';
import { CategoryService } from 'src/app/services/productPage/CategoriesService/category.service';
import { ManufacturerService } from 'src/app/services/productPage/ManufacturersService/manufacturer.service';
import { ProductsService } from 'src/app/services/productPage/products.service';
import { UnitService } from 'src/app/services/productPage/UnitsService/unit.service';
//import { SignalrProductService } from 'src/app/services/productPage/signalr-product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {


  // @Input () editProduct:ProductInfo={
  //   id:0,
  //   title:"",
  //   count:0,
  //   price:0,
  //   category:"",
  //   manufacturer:"",
  //   unit:"",
  //   isBanned:false
    
  // }

  @Input() newProductForm:NewProductForm={
    storage:"",
    title:"",
    price:0,
    count:0,
    manufacturer:"",
    category:"",
    unit:"",
    isBanned:false
  }


  
  @Output() updateProduct=new EventEmitter();
  @Output() close=new EventEmitter();


  pageState:PageState={
    path:"",
    isActive:true
  }
  manufacturers:Manufacturer[]=[];
  categories:Category[]=[];
  units:Unit[]=[];
  //isAddGroup:boolean=false;

  // formEditProduct:FormAddProduct ={
  //   storage:"",
  //   title:this.editProduct.title,
  //   price:this.editProduct.price,
  //   avaiableCount:this.editProduct.count,
  //   category:this.editProduct.category,
  //   manufacturer:this.editProduct.manufacturer,
  //   unit:this.editProduct.unit
  // }
  constructor(
    private readonly service:ProductsService,
    private readonly manufacturerService:ManufacturerService,
    private readonly categoryServie:CategoryService,
    private readonly unitService:UnitService
    ) { 
    
  }

  ngOnInit(): void {
    // console.log(this.editProduct)
    // this.formEditProduct={
    //   storage:"Storage 1",
    //   title:this.editProduct.title,
    //   price:this.editProduct.price,
    //   avaiableCount:this.editProduct.count,
    //   category:this.editProduct.category,
    //   manufacturer:this.editProduct.manufacturer,
    //   unit:this.editProduct.unit
    // }
    this.getManufacturer();
    this.getCategories();
    this.getUnits();

    // if (!this.signalrService.isConnection)
    //   this.signalrService.startConnection();
    //this.ManufacturerOnLis();
    //this.CategoryOnLis();
    //this.UnitOnLis();
  }

  onSubmit(){
    //console.log(this.formEditProduct)
    this.updateProduct.emit(this.newProductForm);
  }

  closeEditPage(){
    this.close.emit();
  }

  startAddGroup(path:string){
    this.pageState={
      path:path,
      isActive:false

    };
  }

  addedGroup(){
    this.pageState={
      path:"",
      isActive:true
    }
  }

  // ManufacturerOnLis(): void {
  //   this.signalrService.hubConnection?.on("manufacturerAdd", (newManufacturer:Manufacturer) => {
  //     this.manufacturers.push(newManufacturer);
  //   });
  // }

  // CategoryOnLis(): void {
  //   this.signalrService.hubConnection?.on("categoryAdd", (newCategory:Category) => {
  //     this.categories.push(newCategory);
  //     console.log(this.categories)
  //   });
  // }

  // UnitOnLis(): void {
  //   this.signalrService.hubConnection?.on("unitAdd", (newUnit:Unit) => {
  //     this.units.push(newUnit);      
  //   });
  // }

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
