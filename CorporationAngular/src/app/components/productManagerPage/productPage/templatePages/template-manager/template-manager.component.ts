import { Component, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { offsetHeader } from 'src/app/components/mainPageComponent/nav-menu/nav-menu.component';
import { Positions } from 'src/app/components/modals/modal/modal.component';
import { ModalInfo } from 'src/app/interfaces/modal';
import { TemplateFilter, TemplateFilterInfo } from 'src/app/interfaces/product/tempalte/templateFilter';
import { maxCount, maxPrice } from '../../products/products.component';
import { Routers} from 'src/app/enums/routers/routers' 
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductKeys } from 'src/app/enums/productPage/productKeys';
import { ProductTemplatesPageState } from 'src/app/interfaces/product/productsPageState';
import { TabService } from 'src/app/services/tab.service';
import { ProductTitlePage as ProductTitlePages } from 'src/app/enums/productPage/productTitlePage';
import { ProductTemplateService } from 'src/app/services/productPage/productTemplate/product-template.service';
import { SearchStringResponce } from 'src/app/interfaces/searchStringResponce';
import { pipe, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UpdateProductTemplateService } from 'src/app/services/productPage/updateServices/update-product-template.service';
import { ToastrService } from 'ngx-toastr';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';




@Component({
  selector: 'app-template-manager',
  templateUrl: './template-manager.component.html',
  styleUrls: ['./template-manager.component.scss']
})


export class TemplateManagerComponent implements OnInit, OnDestroy {

  routers = Routers;
  titlePage = ProductTitlePages.TEMPLATES;

  @Output() modalInfo:ModalInfo={
    title:"Would you like to apply any templates?",
    message:"Using templates let you to get the most focused result!",
    position:Positions.center
  }

  
  isShowModal:boolean = false;
  isScrolling:boolean=false;
  opened : number = -1 ;
  isOpenMenu : boolean = false;
  isModeStart:boolean = false;

  selected:number | null | undefined;
  templates:TemplateFilter[]=[];

  search:string = "";
  isComplitedSearch:boolean = true;
  isLoadingPage:boolean = true;

  private destroy$ = new Subject();
  
  constructor(
    private readonly router: Router,
    private readonly route:ActivatedRoute,
    private readonly localStorage: LocalStorageService,
    private readonly tabServce : TabService,
    private readonly templateService : ProductTemplateService,
    private readonly update  : UpdateProductTemplateService,
    private readonly toastr : ToastrService
    ) {}

  ngOnInit(): void {
    this.isModeStart = history.state.start;

    // this.selected  = this.templateService.current$.value 
    //   ? this.templateService.current$
    //   : 0;
    
   
    this.isModeStart
      ? this.isShowModal = true
      : this.loadData();

    this.routeSub();
    this.currentTemplateSub();
    this.removedTabSub();
    this.updateSub();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
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

  remove(template : TemplateFilter){
    this.update.delete(template.id);
  }

  edit(template : TemplateFilter){
    this.router.navigate([this.routers.EDIT_TEMPLATE],{
      state:{template:template}
    })
  }

  filterBySearch(responce : SearchStringResponce){

    if (!responce.isSameDirection) {
      this.isComplitedSearch = false;
      this.templateService.getStartWith(responce.criteria)
        .subscribe(templates=>{
          this.templates = templates;
          this.isComplitedSearch = true;
        },()=>{
          this.isComplitedSearch = true;
        })
    }
    else{
      this.templates = this.templates
        .filter(template=>template.title.startsWith(responce.criteria));
    }
    this.search = responce.criteria;
    this.saveData();
    
  }

  private getTemplates() { 
    //this.isLoadingPage = true;   
    this.templateService.getByUser()
      .subscribe(templates=>{
        this.templates  = templates;
        
        this.isLoadingPage = false;
    },()=>{
      this.isLoadingPage = true;
    })   
  }

  private loadData(){

    this.getTemplates();
    this.createTab();

    const state = this.localStorage
      .get<ProductTemplatesPageState>(ProductKeys.TEMPLATES);

    if (state?.search) this.search = state?.search;
    if (state?.curr) this.selected = state.curr;
  }

  private saveData(){
    this.localStorage.set(ProductKeys.TEMPLATES,{
      "search"  : this.search,
      "curr": this.selected
    })
  }

  private clearData(){
    //this.localStorage.remove(ProductKeys.NEW_TEMPLATE);
  }

  private createTab(){
    this.tabServce.addedTab({
      title:ProductTitlePages.TEMPLATES,
      router: this.routers.TEMPLATES,
      additional:"",
      key: ProductKeys.TEMPLATES
    })
  }

  private routeSub(){
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params=>{
        const id = params["tempId"];

        if (id && this.isValidId(id)) this.getByIdWithUsers(id);
      })
  }

  private isValidId(id : number) : boolean{
    return id > 0;
  }

  

  private getByIdWithUsers(id : number){
    this.templateService.getByIdWithUsers(id)
      .subscribe(templateInfo=>{
       
        if (!templateInfo) return;
        if (templateInfo.isSaved) 
          this.router.navigate([this.routers.TABLE],{
            state:{
              template:this.getTemplateFilter(templateInfo)
            }})
        else {
          
          this.router.navigate([this.routers.EDIT_TEMPLATE],{
            state : {
              template:this.getTemplateFilter(templateInfo), 
              isUnSaved : !templateInfo.isSaved}
          })
        }
      })
  }

  private currentTemplateSub(){
    this.templateService.current$
      .pipe(takeUntil(this.destroy$))
      .subscribe(current=>{
        
        
        this.selected = this.isModeStart ? null : current;
       
        this.saveData();
      })
  }

  private removedTabSub(){
    this.tabServce.removedTab$
      .pipe(takeUntil(this.destroy$))
      .subscribe(tab=>{
        if (tab.title === ProductTitlePages.NEW_TEMPLATES)
          this.clearData();
      })
  }

  private updateSub(){
    this.update.TemplateChanges$
      .pipe(takeUntil(this.destroy$))
      .subscribe(responce =>{
       
        if (!responce.data){
          console.log(responce.message);
        }
        const id = responce.data;
       
        if (!id) return;

        const index = this.templates
          .findIndex(template => template.id === id)
        
        if (index < 0) return;

        this.templateService.getByUser()
          .subscribe(templates=>{
            this.templates = templates;
            this.createToastr(responce.message);
          })

        

      })
  }

  private createToastr(message : string){

    const name = ProductTitlePages.TEMPLATES;
    this.toastr.info(
      message,
      name,{
      closeButton:true
    })
  }

  // createNotification(tempalte:TemplateFilter){
  //   this.notify.registration({
  //     code:CodeNotification.INFO,
  //     message: tempalte.title + " has been deleted",
  //     type: TypeNotification.INFO
  //   })
  // }

  private getTemplateFilter(templateInfo : TemplateFilterInfo) : TemplateFilter{
    return {
      id:templateInfo.id,
      title:templateInfo.title,
      owner:templateInfo.owner,
      isOwner:templateInfo.isOwner,
      criteria:templateInfo.criteria
    }
  }
}


