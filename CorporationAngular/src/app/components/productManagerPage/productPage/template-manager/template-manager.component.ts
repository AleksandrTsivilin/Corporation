import { Component, HostListener, OnInit, Output } from '@angular/core';
import { offsetHeader } from 'src/app/components/mainPageComponent/nav-menu/nav-menu.component';
import { Positions } from 'src/app/components/modals/modal/modal.component';
import { ModalInfo } from 'src/app/interfaces/modal';
import { TemplateFilter } from 'src/app/interfaces/product/templateFilter';
import { maxCount, maxPrice } from '../products/products.component';
import { Routers} from 'src/app/enums/routers/routers' 
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductKeys } from 'src/app/enums/productPage/productKeys';
import { TableProductsPageState } from 'src/app/interfaces/product/productsPageState';




@Component({
  selector: 'app-template-manager',
  templateUrl: './template-manager.component.html',
  styleUrls: ['./template-manager.component.scss']
})


export class TemplateManagerComponent implements OnInit {

  routers = Routers;

  //private routerSub = new Subscription();

  @Output() modalInfo:ModalInfo={
    title:"Would you like to apply any templates?",
    message:"Using templates let you to get the most focused result!",
    position:Positions.center
  }

  isShowModal:boolean;
  isScrolling:boolean=false;

  templates:TemplateFilter[]=[];
  selected:number = 0;

  constructor(
    private readonly router: Router,
    private readonly localStorage: LocalStorageService
    ) {
    this.isShowModal = history.state.modal;
    
    const id = history.state.id;
    
    id 
      ? this.selected = id
      : this.loadData();

    //this.saveData();
  }

  ngOnInit(): void {

    this.getTemplates();

    // this.routerSub = this.router.events.subscribe(event=>{
    //   if (event instanceof NavigationStart) {
    //     console.log('Navigation Start')
    //     this.saveData();
    //   }
    // })

    //this.createTab();
  }

  // ngOnDestroy(): void {
  //   this.routerSub.unsubscribe();
  // }

  @HostListener("document:scroll")
  scrollfunction(){
    this.isScrolling = window.pageYOffset >= offsetHeader;
  }

  answerModal(answer:boolean){
   
    answer 
      ? this.isShowModal=false
      : this.router
          .navigate([this.routers.TABLE]);
  }

  // apply(template : TemplateFilter){
  //   this.selected = template.id;
  //   //this.saveData();
  //   this.router.navigate([this.routers.TABLE],{
  //     state:{template:template}
  //   })
  // }
  
  // apply(template : TemplateFilter){
  //   //console.log(id);
    
  //   this.selected = template.id;
  //   this.saveData();
  //   this.router.navigate([this.routers.TABLE],{state:{template:template}})
  // }

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
    ]
  }

  // private saveData(){
  //   console.log("save data templates")
  //   this.localStorage.set(ProductKeys.TEMPLATES,{
  //     id:this.selected
  //   })

  //   console.log('end save data')
  // }

  private loadData(){
    const state = this.localStorage.get<TableProductsPageState>(ProductKeys.TABLE);
    const id = state?.template?.id;

    id
      ? this.selected = id
      : this.selected = 0;
  }
}
