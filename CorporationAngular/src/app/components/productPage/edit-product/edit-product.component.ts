import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category, FormAddProduct, Manufacturer, Unit } from 'src/app/interfaces/formAddProduct';
import { ProductInfo } from 'src/app/interfaces/productsInfo';
import { ProductsService } from 'src/app/services/productPage/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {


  @Input () editProduct:ProductInfo={
    id:0,
    title:"",
    count:0,
    price:0,
    category:"",
    manufacturer:"",
    unit:""
  }
  
  @Output() updateProduct=new EventEmitter();

  manufacturers:Manufacturer[]=[];
  categories:Category[]=[];
  units:Unit[]=[];

  formEditProduct:FormAddProduct ={
    title:this.editProduct.title,
    price:this.editProduct.price,
    avaiableCount:this.editProduct.count,
    category:this.editProduct.category,
    manufacturer:this.editProduct.manufacturer,
    unit:this.editProduct.unit
  }
  constructor(private readonly service:ProductsService) { 
    
  }

  ngOnInit(): void {
    this.formEditProduct={
      title:this.editProduct.title,
      price:this.editProduct.price,
      avaiableCount:this.editProduct.count,
      category:this.editProduct.category,
      manufacturer:this.editProduct.manufacturer,
      unit:this.editProduct.unit
    }
    this.getManufacturer();
    this.getCategories();
    this.getUnits();
  }

  onSubmit(){
    console.log(this.formEditProduct)
    this.updateProduct.emit(this.formEditProduct);
  }

  private getManufacturer() {
    this.service.getManufacturers()
      .subscribe((result)=>{
        this.manufacturers=result;
      },()=>{console.log("failed getManufacturer editProduct")})
  }

  private getCategories() {
    this.service.getCategories()
      .subscribe((result)=>{
        this.categories=result;
      },()=>{console.log("failed getCategories editProduct")})
  }

  private getUnits() {
    this.service.getUnits()
      .subscribe((result)=>{
        this.units=result;
      },()=>{console.log("failed getUnits editProduct")})
  }

}
