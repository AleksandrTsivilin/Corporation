import { Component, HostListener, OnInit, Output } from '@angular/core';
import { offsetHeader } from 'src/app/components/mainPageComponent/nav-menu/nav-menu.component';
import { Positions } from 'src/app/components/modals/modal/modal.component';
import { ModalInfo } from 'src/app/interfaces/modal';
import { TemplateFilter } from 'src/app/interfaces/product/templateFilter';
import { maxCount, maxPrice } from '../../products/products.component';
import { Routers} from 'src/app/enums/routers/routers' 
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductKeys } from 'src/app/enums/productPage/productKeys';
import { ProductTemplatesPageState } from 'src/app/interfaces/product/productsPageState';
import { TabService } from 'src/app/services/tab.service';
import { ProductTitlePage as ProductTitlePages } from 'src/app/enums/productPage/productTitlePage';
import { ProductTemplateService } from 'src/app/services/productPage/productTemplate/product-template.service';
import { SearchStringResponce } from 'src/app/interfaces/searchStringResponce';




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

  isShowModal:boolean = true;
  isScrolling:boolean=false;
  opened : number = -1 ;
  isOpenMenu : boolean = false;

  templates:TemplateFilter[]=[];

  search:string = "";
  isComplited:boolean = true;

  
  constructor(
    private readonly router: Router,
    private readonly localStorage: LocalStorageService,
    private readonly tabServce : TabService,
    private readonly templateService : ProductTemplateService
    ) {}

  ngOnInit(): void {
    
  }

  @HostListener("document:scroll")
  scrollfunction(){
    this.isScrolling = window.pageYOffset >= offsetHeader;
  }

  answerModal(answer:boolean){
   
    this.isShowModal = false;
    answer 
      ? this.loadData()
      : this.router
          .navigate([this.routers.TABLE]);
  }

  close(){
    this.tabServce.remove(ProductTitlePages.TEMPLATES);
  }

  openDetails(index : number){
    this.isOpenMenu = !this.isOpenMenu;
    this.isOpenMenu
      ? this.opened = index
      : this.opened = -1;

  }

  filterBySearch(responce : SearchStringResponce){

    if (!responce.isSameDirection) {
      this.isComplited = false;
      this.templateService.getStartWith(responce.criteria)
        .subscribe(templates=>{
          this.templates = templates;
          this.isComplited = true;
        },()=>{
          this.isComplited = true;
        })
    }
    else{
      this.templates = this.templates
        .filter(template=>template.title.startsWith(responce.criteria));
    }
    this.search = responce.criteria;
    this.saveData();
      
    console.log(responce)
  }

  private getTemplates() {    
    // this.templateService.getByUser().subscribe(templates=>{
    //   console.log(templates)
    // })


    // test data
    this.templates = [
      {id:1, title:"Kiev region", readonly:false,
       criteria:{
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
      {id:2, title:"Odessa region", readonly:false,
       criteria:{
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
      {id:3, title:"another region", readonly:true,
       criteria:{
        regionId:0,
        factoryId:0,
        storageId:16,
        manufacturerId:0,
        categoryId:0,
        unitId:0,
        startCount:0,
        endCount:90,
        startPrice:500,
        endPrice:25000
    }},
    {id:12, title:"Odessa region", readonly:false, criteria:{
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
    {id:12, title:"Odessa region", readonly:false, criteria:{
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
    {id:12, title:"Odessa region", readonly:false, criteria:{
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
    {id:12, title:"Odessa region", readonly:false, criteria:{
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
    {id:12, title:"Odessa region", readonly:false, criteria:{
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
    {id:12, title:"Odessa region", readonly:false, criteria:{
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
    {id:12, title:"Odessa region", readonly:false, criteria:{
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
    {id:12, title:"Odessa region", readonly:false, criteria:{
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
    {id:12, title:"Odessa region", readonly:false, criteria:{
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
// {id:1, title:"Kiev region", criteria:{
//   regionId:1,
//   factoryId:0,
//   storageId:0,
//   manufacturerId:0,
//   categoryId:0,
//   unitId:0,
//   startCount:0,
//   endCount:maxCount,
//   startPrice:0,
//   endPrice:maxPrice
// }},
// {id:2, title:"Odessa region", criteria:{
// regionId:2,
// factoryId:0,
// storageId:0,
// manufacturerId:0,
// categoryId:0,
// unitId:0,
// startCount:0,
// endCount:maxCount,
// startPrice:0,
// endPrice:maxPrice
// }}, 
    ]
  }

  private loadData(){

    this.getTemplates();
    this.createTab();

    const state = this.localStorage
      .get<ProductTemplatesPageState>(ProductKeys.TEMPLATES);

    if (state?.search) this.search = state?.search;
  }

  private saveData(){
    this.localStorage.set(ProductKeys.TEMPLATES,{
      "search"  : this.search
    })
  }

  private createTab(){
    this.tabServce.addedTab({
      title:ProductTitlePages.TEMPLATES,
      router: this.routers.TEMPLATES,
      additional:"",
      key: ProductKeys.TEMPLATES
    })
  }
}
