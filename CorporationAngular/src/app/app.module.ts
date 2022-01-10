import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './components/appComponent/app.component';
import { MainPageComponent } from './components/mainPageComponent/main-page/main-page.component';
import { RoleSelectorComponent } from './components/roleSelectorComponent/role-selector/role-selector.component';
import { InformationPageComponent } from './components/mainPageComponent/information-page/information-page.component';
import { LoginFormComponent } from './components/loginPageComponent/login-form/login-form.component';
import { AdminManagerComponent } from './components/adminPage/admin-manager/admin-manager.component';
import { UsersComponent } from './components/adminPage/users/users.component';
import { UserItemComponent } from './components/adminPage/user-item/user-item.component';
import { EditUserComponent } from './components/adminPage/edit-user/edit-user.component';
import { DialogUserInfoComponent } from './components/adminPage/dialog-user-info/dialog-user-info.component';
import { WorkModulesComponent } from './components/adminPage/work-modules/work-modules.component';
import { ProductsComponent } from './components/productManagerPage/productPage/products/products.component';
import { ProductItemComponent } from './components/productManagerPage/productPage/product-item/product-item.component';
import { AddProductComponent } from './components/productManagerPage/productPage/add-product/add-product.component';
import { EditProductComponent } from './components/productManagerPage/productPage/edit-product/edit-product.component';
import { AddManufacturerComponent } from './components/productPage/add-manufacturer/add-manufacturer.component';
import { AddCategoryComponent } from './components/productPage/add-category/add-category.component';
import { AddUnitComponent } from './components/productPage/add-unit/add-unit.component';
import { ProductMovementsComponent } from './components/productManagerPage/moveProductPage/product-movements/product-movements.component';
import { ProductItemMovementsComponent } from './components/productManagerPage/moveProductPage/product-item-movements/product-item-movements.component';
import { GetQueryInterceptor } from './interceptors/get-query.interceptor';
import { LoadingPageComponent } from './components/loading/loading-page/loading-page.component';
import { Responce500Component } from './components/loading/responce500/responce500.component';



@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    RoleSelectorComponent,
    InformationPageComponent,
    LoginFormComponent,
    AdminManagerComponent,
    UsersComponent,
    UserItemComponent,
    EditUserComponent,
    DialogUserInfoComponent,
    WorkModulesComponent,
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
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GetQueryInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
