import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductKeys } from 'src/app/enums/productPage/productKeys';
import { ProductTitlePage } from 'src/app/enums/productPage/productTitlePage';
import { Routers } from 'src/app/enums/routers/routers';
import { ProductPageState, ProductTemplateEditPageState } from 'src/app/interfaces/product/productsPageState';
import { TemplateFilter } from 'src/app/interfaces/product/tempalte/templateFilter';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TabService } from 'src/app/services/tab.service';
import { maxCount, maxPrice } from '../../products/products.component';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss']
})
export class EditTemplateComponent implements OnInit, OnDestroy {

  @Output() startTemplate : TemplateFilter={
    id: 0,
    title: '',
    owner: '',
    isOwner: false,
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
  }
 }

//  @Output() isSaved:boolean = false;

  routers = Routers;
  private destroy$ = new Subject();

  isUnSaved: boolean = false;
  isShowModal:boolean = false;
  constructor(
    private readonly tabService : TabService,
    private readonly router:Router,
    private readonly localStorage:LocalStorageService
  ) { }

  ngOnInit(): void {
    // const template = history.state.template;
    // if (template) {
    //   this.startTemplate = template;
    //   this.saveData();
    // }
    // else this.loadData();

    const template = history.state.template;
    const isUnSaved = history.state.isUnSaved;
    if (template) {
      this.startTemplate = template;
      
      if (isUnSaved) this.isUnSaved = isUnSaved;
      this.saveData();
    }
    else this.loadData();
    this.createTab();
    this.removedSub();

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  close(){
    this.tabService.remove(ProductTitlePage.EDIT_TEMPLATES);
  }

  applyCriteria(filter : TemplateFilter | null){
    this.router.navigate([this.routers.TABLE],{
      state:{
        template:filter
      }
    })
  }

  private createTab(){
    this.tabService.addedTab({
      title : ProductTitlePage.EDIT_TEMPLATES,
      router: this.routers.EDIT_TEMPLATE,
      additional:this.startTemplate.title,
      key:""
    })
  }

  private loadData(){
    const state =  this.localStorage
      .get<ProductTemplateEditPageState>(ProductKeys.EDIT_TEMPLATE);

    if (state?.template) this.startTemplate = state.template;
  }
  private saveData(){
    this.localStorage.set(ProductKeys.EDIT_TEMPLATE,{
      template:this.startTemplate
    })
  }

  private clearData(){
    this.localStorage.remove(ProductKeys.EDIT_TEMPLATE);
  }

  private removedSub(){
    this.tabService.removedTab$
      .pipe(takeUntil(this.destroy$))
      .subscribe(tab=>{
        if (tab.title === ProductTitlePage.EDIT_TEMPLATES)
          this.clearData();
      })
  }

}
