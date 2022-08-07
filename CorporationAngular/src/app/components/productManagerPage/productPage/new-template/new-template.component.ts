import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductTitlePage } from 'src/app/enums/productPage/productTitlePage';
import { Routers } from 'src/app/enums/routers/routers';
import { FactoryInfo } from 'src/app/interfaces/location/factory/factoryInfo';
import { RegionInfo } from 'src/app/interfaces/location/region/regionInfo';
import { LoadingOptionFilterByCriteria } from 'src/app/interfaces/product/loadingOptionProductPage';
import { NewTemplateFilter } from 'src/app/interfaces/product/newTemplateFilter';
import { FilterProductForm } from 'src/app/interfaces/product/productFilterForm';
import { TemplateFilter } from 'src/app/interfaces/product/templateFilter';
import { TabService } from 'src/app/services/tab.service';
import { maxCount, maxPrice } from '../products/products.component';

@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.scss']
})
export class NewTemplateComponent implements OnInit {


  routers = Routers;
  newTemplate: TemplateFilter ={
    id: 0,
    title: 'new template',
    criteria: {
      regionId:0,
      factoryId:0,
      storageId:0,
      manufacturerId:0,
      categoryId:0,
      unitId:0,
      startCount:0,
      endCount:maxCount,
      startPrice:0,
      endPrice:maxPrice
    }
  }

  constructor(
    private readonly router:Router,
    private readonly tabService : TabService
  ) { }

  ngOnInit(): void {
    this.createTab();
  }

  applyCriteria(filter:TemplateFilter | null){
    console.log(filter);
    this.router.navigate([this.routers.TABLE],{
      state:{
        template:filter
      }
    })
  }

  close(){
    this.tabService.remove(ProductTitlePage.NEW_TEMPLATES);
  }

  private createTab(){
    this.tabService.addedTab({
      title : ProductTitlePage.NEW_TEMPLATES,
      router: this.routers.NEW_TEMPLATE,
      additional:"",
      key:""
    })
  }
}
