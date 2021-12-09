import { Component, OnInit } from '@angular/core';
import { Category, FormAddProduct, Manufacturer, Unit } from 'src/app/interfaces/formAddProduct';
//import { Category, Manufacturer, Unit } from 'src/app/interfaces/productsInfo';
import { ProductsService } from 'src/app/services/productPage/products.service';
import { SignalrProductService } from 'src/app/services/productPage/signalr-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  formAddProduct:FormAddProduct={
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

  constructor(
    private readonly service:ProductsService,
    private readonly signalrService:SignalrProductService
    ) { }

  ngOnInit(): void {
    this.getManufacturers();
    console.log(this.manufacturers);
    this.getCategories();
    this.getUnits();
    this.signalrService.startConnection();
  }

  onSubmit(){
    console.log(this.formAddProduct);
    //this.formAddProduct.avaiableCount=Number(this.formAddProduct.avaiableCount)
    this.signalrService.addProduct(this.formAddProduct);
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
