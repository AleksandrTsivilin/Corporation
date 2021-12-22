import { Component, Input, OnInit } from '@angular/core';
import { Category, FormAddProduct, Manufacturer, Unit } from 'src/app/interfaces/formAddProduct';
//import { Category, Manufacturer, Unit } from 'src/app/interfaces/productsInfo';
import { ProductsService } from 'src/app/services/productPage/products.service';
import { SignalrProductService } from 'src/app/services/productPage/signalr-product.service';
import { ProductUpdateService } from 'src/app/services/products/updateServices/product-update.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @Input() storage:string="";
  formAddProduct:FormAddProduct={
    storage:this.storage,
    title:"",
    price:0,
    avaiableCount:0,
    manufacturer:"", //{title:""} as Manufacturer,
    category:"", // {title:""} as Category,
    unit:"",// {title:""} as Unit
  }

  
  manufacturers:Manufacturer[]=[]; // Manufacturer[]=[];
  categories:Category[]=[];// Category[]=[];
  units:Unit[]=[]; // Unit[]=[];

  // private readonly signalrService:SignalrProductService
  constructor(
    private readonly service:ProductsService,
    private readonly updateService:ProductUpdateService
    ) { }

  ngOnInit(): void {
    this.formAddProduct.storage=this.storage;
    this.getManufacturers();
    this.getCategories();
    this.getUnits();
    // if (!this.signalrService.isConnection)
    //   this.signalrService.startConnection();
  }

  onSubmit(){
    console.log(this.formAddProduct);    
    //this.formAddProduct.avaiableCount=Number(this.formAddProduct.avaiableCount)
    this.updateService.addProduct(this.formAddProduct);
  }

  private getManufacturers(){
    this.service.getManufacturers()
      .subscribe((result)=>{
        this.manufacturers=result;
        console.log(this.manufacturers)
        
      },()=>{
        console.log("failed get manufacturers")
      })
  
  }

  private getCategories(){
    this.service.getCategories()
      .subscribe((result)=>{
        this.categories=result;
        
      },()=>{
        console.log("failed get manufacturers")
      })
  }

  private getUnits(){
    this.service.getUnits()
      .subscribe((result)=>{
        this.units=result;
        
      },()=>{
        console.log("failed get manufacturers")
      })
  }

}
