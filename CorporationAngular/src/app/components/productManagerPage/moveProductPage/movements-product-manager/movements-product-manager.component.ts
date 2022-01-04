import { Component, OnInit } from '@angular/core';
import { FormMoveProducts } from 'src/app/interfaces/formMoveProduct';
import { HeaderTable } from 'src/app/interfaces/header-table';
import { PageState } from 'src/app/interfaces/pageState';
import { StorageInfo } from 'src/app/interfaces/storageInfo';
import { ProductsService } from 'src/app/services/productPage/products.service';
//import { UpdateService } from 'src/app/services/update.service';

@Component({
  selector: 'app-movements-product-manager',
  templateUrl: './movements-product-manager.component.html',
  styleUrls: ['./movements-product-manager.component.scss']
})
export class MovementsProductManagerComponent implements OnInit {

  
  pageState:PageState={
    path:"",
    isActive:true
  }  

  constructor() { }

  ngOnInit(): void {
    // this.serviceUpdate.test$.subscribe((result)=>{
    //   this.testMove=result;
    // });
    
    
  }

  changeModePage(path:string){
    this.pageState={
      path:path,
      isActive:false
    }

    
  }

  

}
