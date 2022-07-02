import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Positions } from 'src/app/components/modals/modal/modal.component';
import { AvaiablesPermissions } from 'src/app/interfaces/avaiablesPermissions';
import { ModalInfo } from 'src/app/interfaces/modal';
import { PageState } from 'src/app/interfaces/pageState';
import { ProductFilterForm } from 'src/app/interfaces/product/productFilterForm';
import { maxCount, maxPrice } from '../products/products.component';



interface TemplateRequest{
  id:number,
  title:string
}

@Component({
  selector: 'app-template-manager',
  templateUrl: './template-manager.component.html',
  styleUrls: ['./template-manager.component.scss']
})


export class TemplateManagerComponent implements OnInit {

  

  @Output() modalInfo:ModalInfo={
    title:"Would you like to apply any templates?",
    message:"Using templates allows you to get the most focused result!",
    position:Positions.center
  }

  templates:TemplateRequest[]=[];

  pageState:PageState={
    path:"modal",
    isActive:false
  }

  
  @Output() closePage = new EventEmitter<ProductFilterForm | null>()
  
  

  constructor() { }

  ngOnInit(): void {
    this.getTemplates();
  }

  answerModal(answer:boolean){
    answer 
      ? this.setPageState("",true)
      : this.closePage.emit(null)
  }

  close(){
    this.closePage.emit(null);
  }

  apply(index:number){
    console.log(index)
    this.closePage.emit({
        title:"",
        regionId:1,
        factoryId:0,
        storageId:0,
        manufacturerId:0,
        categoryId:0,
        unitId:0,
        startCount:0,
        endCount:maxCount,
        startPrice:0,
        endPrice:maxPrice
    })
  }

  private getTemplates() {    
    this.templates = [
      {id:1,title:"template 1"},
      {id:2,title:"template 2"},
      {id:3,title:"template 3"},
      {id:2,title:"template 2"},
      {id:3,title:"template 3"},
      {id:2,title:"template 2"},
      {id:3,title:"template 3"},
      {id:2,title:"template 2"},
      {id:3,title:"template 3"},
      {id:2,title:"template 2"},
      {id:3,title:"template 3"},
      {id:2,title:"template 2"},
      {id:3,title:"template 3"},
      {id:2,title:"template 2"},
      {id:3,title:"template 3"},
      {id:2,title:"template 2"},
      {id:3,title:"template 3"},
      {id:4,title:"template 40"}]
    
    this.templates.length>0 
      ? this.setPageState("modal",false)
      : this.setPageState("products",false)
  }

  private setPageState(path:string,isActive:boolean){
    this.pageState={
      path:path,
      isActive:isActive
    }
  }

}