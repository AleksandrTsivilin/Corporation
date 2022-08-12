import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductKeys } from 'src/app/enums/productPage/productKeys';
import { ProductTitlePage } from 'src/app/enums/productPage/productTitlePage';
import { Routers } from 'src/app/enums/routers/routers';
import { NewTemplatePageState } from 'src/app/interfaces/product/productsPageState';
import { TemplateFilter } from 'src/app/interfaces/product/templateFilter';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TabService } from 'src/app/services/tab.service';
import { maxCount, maxPrice } from '../products/products.component';

@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.scss']
})
export class NewTemplateComponent implements OnInit {


  routers = Routers;
  keys = ProductKeys;
  newTemplate: TemplateFilter ={
    id: 0,
    title: 'new template',
    criteria: {
      regionId: 0,
      factoryId: 0,
      storageId: 0,
      manufacturerId: 0,
      categoryId: 0,
      unitId: 0,
      startCount: 0,
      endCount: maxCount,
      startPrice: 0,
      endPrice: maxPrice
    },
    readonly: false
  }

  constructor(
    private readonly router:Router,
    private readonly tabService : TabService,
    private readonly localStorage:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.createTab();
    const template = history.state.template;
    console.log(template)
    //if (template) this.startSetting(template);
    template 
      ? this.startSetting(template)
      : this.loadData();

    //if (template) this.newTemplate = template;
  }

  applyCriteria(filter:TemplateFilter | null){
    this.clearData();
    this.router.navigate([this.routers.TABLE],{
      state:{
        template:filter
      }
    })
  }

  close(){
    this.clearData();
    this.tabService.remove(ProductTitlePage.NEW_TEMPLATES);
  }

  private createTab(){
    this.tabService.addedTab({
      title : ProductTitlePage.NEW_TEMPLATES,
      router: this.routers.NEW_TEMPLATE,
      additional:"",
      key:ProductKeys.NEW_TEMPLATE
    })
  }

  private loadData(){
   const state =  this.localStorage.get<NewTemplatePageState>(ProductKeys.NEW_TEMPLATE);
  
    const template = state?.template;

    if (template) this.newTemplate = template;
  }

  private saveData(){
    this.localStorage.set(ProductKeys.NEW_TEMPLATE,{
      'template' : this.newTemplate,
    })
  }

  private startSetting(template : TemplateFilter){
    this.newTemplate = template;
    this.saveData();
  }

  private clearData(){
    this.localStorage.remove(ProductKeys.NEW_TEMPLATE);
    this.localStorage.remove(ProductKeys.CRITERIA_TEMPLATE);
  }
}
