
import { Component,OnDestroy,OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Positions } from 'src/app/components/modals/modal/modal.component';
import { ProductKeys } from 'src/app/enums/productPage/productKeys';
import { ProductTitlePage } from 'src/app/enums/productPage/productTitlePage';
import { Routers } from 'src/app/enums/routers/routers';
import { ModalInfo } from 'src/app/interfaces/modal';
import { ProductPageState } from 'src/app/interfaces/product/productsPageState';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductTemplateService } from 'src/app/services/productPage/productTemplate/product-template.service';
import { TabService } from 'src/app/services/tab.service';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  // routers = Routers;

  // isShowModal = false;
  // //private isNewTab = true;
  // isLoadingPage: boolean =false;
  // isLoadProductPage:boolean = false;
  // isReload:boolean = false;
  
  // modal : ModalInfo = {
  //   title: "Would you like to open new product tab",
  //   message: 'If you open new tab, data will be lost',
  //   position: Positions.center
  // }

  // private destroy$ = new Subject();
  // private productSession: string ="";



  constructor(
    // private readonly router : Router,    
    // private readonly route: ActivatedRoute,
    // private readonly tabService: TabService,
    // private readonly templateService : ProductTemplateService,
    // private readonly localStorage : LocalStorageService
    ) {


      // this.router.events.subscribe(event=>{

      //   // const state = history.state
        
      //   // if(state?.start) {
      //   //   this.isNewTab = true;
      //   //   this.isShowModal = true;
      //   //   return;
      //   // }

      //   if (event instanceof NavigationEnd){
          
      //     if (event.url === "/services/products") {
      //       //this.isLoadProductPage = true;
      //       //this.router.navigate(['/services/products/templates'])


      //     }
      //     //else this.isLoadProductPage = false;

      //   }
      // })
    }


  ngOnInit(): void {
    
    //if  (!this.isLoadProductPage)
    //this.routeSub();
    //this.removedTabSub();

    //this.isShowModal = true;
    //console.log("onInit product page")
    //const state = history.state.start;
    //console.log("state product page " + state)

    // state
    //   ? console.log("state is")
    //   : console.log("state no")
    //this.loadData();
    
    //debugger;

    
  }

  // ngOnDestroy(): void {
  //   this.destroy$.next(true);
  //   this.destroy$.complete();
  // }

  // answerModal(answer : boolean){
  //   // answer
  //   //   ? this.startSetting()
  //   //   : this.router.navigate(['/services']);
    
  //   if (answer) {
      
  //     this.loadData();
  //     console.log("product session = " + this.productSession);
  //     this.productSession.length>0
  //       ? this.tabService.remove(ProductTitlePage.TABLE)
  //       : this.test_defaultStart();
  //   }
  //   else this.router.navigate(['/services'])
  //   this.isShowModal = false;
  // }

  // private startSetting(){
  //   this.isShowModal = false;

  //   //const state = this.localStorage
  //   if (this.productSession){
  //     this.tabService.remove(ProductTitlePage.TABLE);
  //   }
  //   //this.isReload = true;
    
  //   //this.saveData();
    
  //   //this.router.navigate([this.routers.INSTRUCTION]);

  //   // if (this.isNewTab) {
  //   //     //this.tabService.remove("products")
  //   //     this.router.navigate([this.routers.INSTRUCTION]);
  //   // }
  // }

  // private routeSub(){
  //   this.route.queryParams
  //     .pipe(
  //       takeUntil(this.destroy$)
  //     ).subscribe(params=>{
  //       console.log("product page sub")
  //       const id  = params['tempId'];
  //       //if (!id) 
  //       console.log("tempId  "+ id)
  //       console.log(this.isCloneIdValid(id))
  //       if (this.isCloneIdValid(id)){
  //         //this.isLoadProductPage = false;
  //         this.getById(id);
  //       }   
  //       // else{
  //       //   const start = history.state.start;
  //       //   console.log("state  " + start)
  //       //   if (start){
        
  //       //     this.isNewTab = true;
  //       //     this.isShowModal = true;
  //       //     this.isLoadProductPage = false;
  //       //   }
  //       //   //else this.isLoadProductPage = true;
          
  //       // }        
  //     })
  // }

  // private routeSub(){
  //   this.route.queryParams
  //     .pipe(
  //       takeUntil(this.destroy$)
  //     ).subscribe(params=>{
  //       console.log("route sub");


  //       const id = params['tempId'];
  //       console.log(params['id'])

  //       if (id) {
  //         this.isCloneIdValid(id)
  //           ? this.getById(id)
  //           : console.log("continue work");
  //       }
  //       // else {
          
  //       //   this.elseSection();
  //       //   // console.log("id is not exist " + id)
  //       //   //  const start = history.state.start;
  //       //   //  start 
  //       //   //    ? this.test_startSetting()
  //       //   //    : this.test_updateSetting();
  //       //   // console.log(start)
  //       //   // if (start){
  //       //   //   this.isShowModal = true;
  //       //   //   this.isReload = true;
  //       //   // }
  //       //   // else this.loadData();
  //       //   // warning modal do you want start again
  //       //   // remove tab
  //       //   //
  //       //   // go to template
  //       //   //  ? this.isShowModal = true

  //       //   //
  //       //   //  : this.loadData();
  //       //   // this.router.navigate([this.routers.INSTRUCTION])
  //       // }
  //     })
  // }

  // private getById(id : number){
  //   //this.isComplited = false;
  //   this.isLoadingPage = true;

  //   this.templateService.getById(id)
  //     .subscribe(template=>{
  //       console.log(template)
  //       if (template){
  //         this.router.navigate([Routers.TABLE],{
  //           state:{template:template}
  //         })
          
          
  //       }
  //       else{
  //         this.router.navigate([Routers.NEW_TEMPLATE]);

  //       }
  //     this.isLoadingPage = false;
  //   },()=>{
  //     //this.isComplited = true;
  //     this.isLoadingPage = false;
  //   })
  // }


  // private isCloneIdValid(id : number) : boolean{
  //   return id>0;
  // }

  // private saveData(){
  //   this.localStorage.set(ProductKeys.PRODUCTS,{
  //     "start": true
  //   })
  // }

  // private loadData(){
  //   const state =  this.localStorage.get<ProductPageState>(ProductKeys.PRODUCTS);
  //   const start = state?.start;
  //   this.productSession = start ? start : "";

  //   // start 
  //   //   ? this.router.navigate([this.routers.TABLE])
  //   //   : this.isShowModal = true;
  // }

  // private clearData(){
  //   this.localStorage.remove(ProductKeys.PRODUCTS);
  // }

  // private removedTabSub(){
  //   this.tabService.removedTab$
  //     .pipe(takeUntil(this.destroy$)
  //     )
  //     .subscribe(tab=>{
  //       console.log("removedTabSub is working")
  //       if (tab.title === ProductTitlePage.TABLE) {
  //         this.tabService.remove(ProductTitlePage.TEMPLATES);
  //         this.clearData();
  //         if (this.isReload) {
  //           this.saveData();
  //           this.isReload = false;
  //         }
  //       }
  //     })
  // }



  // private test_startSetting(){
  //   this.isReload = true;
  //   this.isShowModal = true;
  // }

  // private test_updateSetting(){
  //   this.loadData();
  //   this.productSession
  //     ? this.router.navigate([this.routers.TABLE])
  //     : this.test_defaultStart();
  // }

  // private test_defaultStart(){
  //   this.saveData();
  //   this.router.navigate([this.routers.INSTRUCTION]);
  // }

  // private elseSection(){
  //   console.log("else section")
  //   //check state

  //   const startState = history.state.start;

  //   console.log("startState  =  " + startState)
  //   startState
  //     ? this.test_fromService()
  //     : this.test_afterReload();
  // }

  // private test_fromService(){
  //   console.log("from service")
  //   this.loadData();
  //   this.productSession
  //     ? console.log("restart session")
  //     : console.log("new session");

  //   this.saveData();
  // }

  // private test_afterReload(){
  //   console.log("after reload")
  //   this.loadData();
  //   console.log("product_session = " + this.productSession);
  //   if (this.productSession) {
  //     this.router.navigate([this.routers.TABLE])
  //   }
  //   else {
  //     this.router.navigate([this.routers.INSTRUCTION]);
  //   }
  // }

  // private test_fromTabs(){
  //   console.log("after click tabs")
  // }
}
