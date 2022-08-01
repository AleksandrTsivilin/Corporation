import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { offsetHeader } from 'src/app/components/mainPageComponent/nav-menu/nav-menu.component';
import { Positions } from 'src/app/components/modals/modal/modal.component';
import { ModalInfo } from 'src/app/interfaces/modal';
import { TemplateFilter } from 'src/app/interfaces/product/templateFilter';
import { maxCount, maxPrice } from '../products/products.component';
import { Routers} from 'src/app/enums/routers/routers' 
import { Router } from '@angular/router';





@Component({
  selector: 'app-template-manager',
  templateUrl: './template-manager.component.html',
  styleUrls: ['./template-manager.component.scss']
})


export class TemplateManagerComponent implements OnInit {

  routers = Routers;

  @Output() modalInfo:ModalInfo={
    title:"Would you like to apply any templates?",
    message:"Using templates let you to get the most focused result!",
    position:Positions.center
  }

  isShowModal:boolean;

  templates:TemplateFilter[]=[];


  @Input () templateId:number=0;
  //@Output() closePage = new EventEmitter<TemplateFilter | null>()
  
  
  isScrolling:boolean=false;
  constructor(private readonly router: Router) {
    this.isShowModal = !history.state.skipModal;
  }

  ngOnInit(): void {

    this.getTemplates();
  }

  @HostListener("document:scroll")
  scrollfunction(){
    console.log(this.isScrolling)
    this.isScrolling = window.pageYOffset >= offsetHeader;
  }

  answerModal(answer:boolean){
   
    answer 
      ? this.isShowModal=false
      : this.router
          .navigate(['/services/products/table']);
  }

  close(){
    //this.closePage.emit(null);
  }

  apply(index:number){
    //this.closePage.emit(this.templates[index])
  }

  private getTemplates() {    
    this.templates = [
      {id:1, title:"Kiev region", criteria:{
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
      }},
      {id:2, title:"Odessa region", criteria:{
        regionId:2,
        factoryId:0,
        storageId:0,
        manufacturerId:0,
        categoryId:0,
        unitId:0,
        startCount:0,
        endCount:maxCount,
        startPrice:0,
        endPrice:maxPrice
      }},
      {id:1, title:"Kiev region", criteria:{
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
    }},
    {id:2, title:"Odessa region", criteria:{
      regionId:2,
      factoryId:0,
      storageId:0,
      manufacturerId:0,
      categoryId:0,
      unitId:0,
      startCount:0,
      endCount:maxCount,
      startPrice:0,
      endPrice:maxPrice
    }},
    {id:1, title:"Kiev region", criteria:{
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
  }},
  {id:2, title:"Odessa region", criteria:{
    regionId:2,
    factoryId:0,
    storageId:0,
    manufacturerId:0,
    categoryId:0,
    unitId:0,
    startCount:0,
    endCount:maxCount,
    startPrice:0,
    endPrice:maxPrice
  }},
  {id:1, title:"Kiev region", criteria:{
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
}},
{id:2, title:"Odessa region", criteria:{
  regionId:2,
  factoryId:0,
  storageId:0,
  manufacturerId:0,
  categoryId:0,
  unitId:0,
  startCount:0,
  endCount:maxCount,
  startPrice:0,
  endPrice:maxPrice
}},
      {id:1, title:"Kiev region", criteria:{
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
    }},
    {id:2, title:"Odessa region", criteria:{
      regionId:2,
      factoryId:0,
      storageId:0,
      manufacturerId:0,
      categoryId:0,
      unitId:0,
      startCount:0,
      endCount:maxCount,
      startPrice:0,
      endPrice:maxPrice
    }},
    {id:1, title:"Kiev region", criteria:{
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
  }},
  {id:2, title:"Odessa region", criteria:{
    regionId:2,
    factoryId:0,
    storageId:0,
    manufacturerId:0,
    categoryId:0,
    unitId:0,
    startCount:0,
    endCount:maxCount,
    startPrice:0,
    endPrice:maxPrice
  }},
  {id:1, title:"Kiev region", criteria:{
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
}},
{id:2, title:"Odessa region", criteria:{
  regionId:2,
  factoryId:0,
  storageId:0,
  manufacturerId:0,
  categoryId:0,
  unitId:0,
  startCount:0,
  endCount:maxCount,
  startPrice:0,
  endPrice:maxPrice
}},
{id:1, title:"Kiev region", criteria:{
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
}},
{id:2, title:"Odessa region", criteria:{
regionId:2,
factoryId:0,
storageId:0,
manufacturerId:0,
categoryId:0,
unitId:0,
startCount:0,
endCount:maxCount,
startPrice:0,
endPrice:maxPrice
}},

    ]
  }

}
