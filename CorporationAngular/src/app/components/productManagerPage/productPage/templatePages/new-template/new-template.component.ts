import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProductKeys } from 'src/app/enums/productPage/productKeys';
import { ProductTitlePage } from 'src/app/enums/productPage/productTitlePage';
import { Routers } from 'src/app/enums/routers/routers';
import { TemplateFilter } from 'src/app/interfaces/product/tempalte/templateFilter'; 
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductTemplateService } from 'src/app/services/productPage/productTemplate/product-template.service';
import { TabService } from 'src/app/services/tab.service';
import { maxCount, maxPrice } from '../../products/products.component';

@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.scss']
})
export class NewTemplateComponent implements OnInit {


  routers = Routers;
  titlePage = ProductTitlePage.NEW_TEMPLATES
  //readonly keyStorage = ProductKeys.NEW_TEMPLATE;

  @Output() newTemplate: TemplateFilter = {
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
    owner: '',
    isOwner: false
  }

  //@Output () isApply : boolean = false;

  isComplited: boolean = true;

  //private destroy$ = new Subject();
  //private rawTemplate: TemplateFilter | null = null;

  constructor(
    private readonly router:Router,
    private readonly tabService : TabService,
    //private readonly localStorage : LocalStorageService
  ) { }

  ngOnInit(): void {

    //this.loadData();

    this.createTab();

    //this.removedTabSub();
  }

  // ngOnDestroy(): void {
  //   this.destroy$.next(true);
  //   this.destroy$.complete();
  // }

  

  applyCriteria(filter:TemplateFilter | null){

    //this.clearData();
    this.router.navigate([this.routers.TABLE],{
      state:{
        template:filter
      }
    })
  }

  // saveChanges(raw : TemplateFilter){
  //   this.rawTemplate = raw;
  //   this.isApply = true;
  //   this.saveData();
  // }

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

  // private saveData() {
  //   this.localStorage.set(ProductKeys.NEW_TEMPLATE,{
  //     raw : this.rawTemplate,
  //     isChanged : this.isApply
  //   })
  // }

  // private loadData(){
  //   const state = this.localStorage
  //     .get<ProductNewTemplatePageState>
  //       (ProductKeys.NEW_TEMPLATE);

  //   //if (state?.raw) this.newTemplate = state.raw;
  //   //if( state?.isChanged) this.isApply = true;
  // }

  // private clearData(){
  //   this.localStorage.remove(ProductKeys.NEW_TEMPLATE);
  // }

  // private removedTabSub(){

  //   this.tabService.removedTab$ 
  //     .pipe(
  //       takeUntil(this.destroy$)
  //       )
  //     .subscribe(tab=>{
  //       if (tab.title === ProductTitlePage.NEW_TEMPLATES)
  //         this.clearData();
  //     })
  // }  
}
