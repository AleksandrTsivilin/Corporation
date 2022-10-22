import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryInfo } from 'src/app/interfaces/product/categoryManagerPage/categoryInfo';
//import { Category } from 'src/app/interfaces/formAddProduct';
//import { SignalrProductService } from 'src/app/services/productPage/signalr-product.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  formCategory:CategoryInfo={
    id:0,
    title:""
  }

  @Output() addCategory=new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  // onSubmit(){
  //   console.log(this.formCategory);
  //   //this.signalrService.addCategory(this.formCategory);
  //   this.addCategory.emit();

  // } 

}
