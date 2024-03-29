import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './components/appComponent/app.component';
import { MainPageComponent } from './components/mainPageComponent/main-page/main-page.component';
import { RoleSelectorComponent } from './components/roleSelectorComponent/role-selector/role-selector.component';
import { InformationPageComponent } from './components/mainPageComponent/information-page/information-page.component';
import { UsersComponent } from './components/userManagerPage/users/users.component';
import { UserItemComponent } from './components/userManagerPage/user-item/user-item.component';
import { EditUserComponent } from './components/userManagerPage/edit-user/edit-user.component';
import { DialogUserInfoComponent } from './components/userManagerPage/dialog-user-info/dialog-user-info.component';
import { ProductsComponent } from './components/productManagerPage/productPage/products/products.component';
import { ProductItemComponent } from './components/productManagerPage/productPage/product-item/product-item.component';
import { AddProductComponent } from './components/productManagerPage/productPage/add-product/add-product.component';
import { EditProductComponent } from './components/productManagerPage/productPage/edit-product/edit-product.component';
import { AddManufacturerComponent } from './components/productPage/add-manufacturer/add-manufacturer.component';
import { AddCategoryComponent } from './components/productPage/add-category/add-category.component';
import { AddUnitComponent } from './components/productPage/add-unit/add-unit.component';
import { ProductMovementsComponent } from './components/productManagerPage/moveProductPage/product-movements/product-movements.component';
import { ProductItemMovementsComponent } from './components/productManagerPage/moveProductPage/product-item-movements/product-item-movements.component';
import { LoadingPageComponent } from './components/loading/loading-page/loading-page.component';
import { Responce500Component } from './components/loading/responce500/responce500.component';
import { CreateAccountComponent } from './components/loginPageComponent/create-account/create-account.component';
import { AddUserComponent } from './components/userManagerPage/add-user/add-user.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PersonalUserDataComponent } from './components/personalDataPage/personal-user-data/personal-user-data.component';
import { ProductItemInfoComponent } from './components/productManagerPage/productPage/product-item-info/product-item-info.component';
import { WarningDialogMovementsComponent } from './components/productManagerPage/moveProductPage/warning-dialog-movements/warning-dialog-movements.component';
import { FilterByTitleComponent } from './components/productManagerPage/productPage/filter-by-title/filter-by-title.component';
import { FilterByCriteriaComponent } from './components/productManagerPage/productPage/filter-by-criteria/filter-by-criteria.component';
import { TemplateManagerComponent } from './components/productManagerPage/productPage/templatePages/template-manager/template-manager.component';
import { ModalComponent } from './components/modals/modal/modal.component';
import { WarningModalComponent } from './components/modals/warning-modal/warning-modal.component';
import { MainPageImageComponent } from './components/mainPageComponent/main-page-image/main-page-image.component';
import { MobileMenuComponent } from './components/mainPageComponent/mobile-menu/mobile-menu.component';
import { NavMenuComponent } from './components/mainPageComponent/nav-menu/nav-menu.component';
import { HomePageComponent } from './components/homePage/home-page/home-page.component';
import { LoginPageComponent } from './components/loginPage/login-page/login-page.component';
import { ResourcesComponent } from './components/homePage/resourcesPage/resources/resources.component';
import { AboutUsComponent } from './components/homePage/aboutUs/about-us/about-us.component';
import { ContactsComponent } from './components/homePage/contactsPage/contacts/contacts.component';
import { ServicesPageComponent } from './components/servicesPage/services-page/services-page.component';
import { ServiceListComponent } from './components/servicesPage/service-list/service-list.component';
import { ServiceTabsComponent } from './components/servicesPage/service-tabs/service-tabs.component';
import { ResetButtonComponent } from './components/tools/resetButton/reset-button/reset-button.component';
import { ProductPageComponent } from './components/productManagerPage/productPage/product-page/product-page.component';
import { ResponceManagerComponent } from './components/responces/responce-manager/responce-manager.component';
import { SelectLoadingComponent } from './components/tools/select-loading/select-loading.component';
import { ProductInstructionComponent } from './components/productManagerPage/productPage/product-instruction/product-instruction.component';
import { ErrorCatchInterceptor } from './interceptors/error-catch.interceptor';
import { NewTemplateComponent } from './components/productManagerPage/productPage/templatePages/new-template/new-template.component';
import { CloseBtnComponent } from './components/tools/closePageBtn/close-btn/close-btn.component';
import { GetInfoModalComponent } from './components/modals/getInfoModal/get-info-modal/get-info-modal.component';
import { TemplateItemDetailComponent } from './components/productManagerPage/productPage/templatePages/template-item-detail/template-item-detail.component';
import { EditTemplateComponent } from './components/productManagerPage/productPage/templatePages/edit-template/edit-template.component';
import { SearchStringComponent } from './components/tools/search-string/search-string.component';
import { InfoComponent } from './components/homePage/mainPage/info/info.component';
import { LogoSliderComponent } from './components/homePage/mainPage/logoSlider/logo-slider/logo-slider.component';
import { CarouselElementDirective } from './directives/carusel-element.directive';
import { CarouselComponent } from './components/homePage/mainPage/logoSlider/carousel/carousel.component';
import { FormLabelComponent } from './components/tools/form-label/form-label.component';
import { FormValidatorDirective } from './directives/form-validator.directive';




@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    RoleSelectorComponent,
    InformationPageComponent,
    UsersComponent,
    UserItemComponent,
    EditUserComponent,
    DialogUserInfoComponent,
    ProductsComponent,
    ProductItemComponent,
    AddProductComponent,
    EditProductComponent,
    AddManufacturerComponent,
    AddCategoryComponent,
    AddUnitComponent,
    ProductMovementsComponent,
    ProductItemMovementsComponent,
    LoadingPageComponent,
    Responce500Component,
    CreateAccountComponent,
    AddUserComponent,
    PersonalUserDataComponent,
    ProductItemInfoComponent,
    WarningDialogMovementsComponent,
    FilterByTitleComponent,
    FilterByCriteriaComponent,
    TemplateManagerComponent,
    ModalComponent,
    WarningModalComponent,
    MainPageImageComponent,
    MobileMenuComponent,
    NavMenuComponent,
    HomePageComponent,
    LoginPageComponent,
    ResourcesComponent,
    AboutUsComponent,
    ContactsComponent,
    ServicesPageComponent,
    ServiceListComponent,
    ServiceTabsComponent,
    ResetButtonComponent,
    ProductPageComponent,
    ResponceManagerComponent,
    SelectLoadingComponent,
    ProductInstructionComponent,
    NewTemplateComponent,
    CloseBtnComponent,
    GetInfoModalComponent,
    TemplateItemDetailComponent,
    EditTemplateComponent,
    SearchStringComponent,
    InfoComponent,
    LogoSliderComponent,
    CarouselElementDirective,
    CarouselComponent,
    FormLabelComponent,
    FormValidatorDirective
    
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      enableHtml:true,
      timeOut:10000,
      positionClass:'toast-top-right',
      preventDuplicates:false
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
