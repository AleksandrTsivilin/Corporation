import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
//import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
//import {  FormArray, FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';

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
import { ProductManagerComponent } from './components/productPage/product-manager/product-manager.component';
import { MoveProductComponent } from './components/productPage/move-product/move-product.component';
import { ProductsComponent } from './components/productPage/products/products.component';
import { ProductItemComponent } from './components/productPage/product-item/product-item.component';
import { AddProductComponent } from './components/productPage/add-product/add-product.component';
import { EditProductComponent } from './components/productPage/edit-product/edit-product.component';
import { AddManufacturerComponent } from './components/productPage/add-manufacturer/add-manufacturer.component';
import { AddCategoryComponent } from './components/productPage/add-category/add-category.component';
import { AddUnitComponent } from './components/productPage/add-unit/add-unit.component';
//import { ProductComponent } from './components/productPage/product/product.component';
//import { ProductsComponent } from './components/products/products.component';
//import { AddModuleComponent } from './components/adminPage/add-module/add-module.component';
//import { DialogUserInfoComponent } from './compomponents/adminPage/dialog-user-info/dialog-user-info.component';




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
    ProductManagerComponent,
    MoveProductComponent,
    ProductsComponent,
    ProductItemComponent,
    AddProductComponent,
    EditProductComponent,
    AddManufacturerComponent,
    AddCategoryComponent,
    AddUnitComponent,
    //ProductComponent,
    //ProductsComponent,    
    //DialogUserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //FormControl,
    //FormGroup,
    //FormBuilder,
    //FormArray
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
