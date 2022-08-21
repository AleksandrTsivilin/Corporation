import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/homePage/aboutUs/about-us/about-us.component';
import { ContactsComponent } from './components/homePage/contactsPage/contacts/contacts.component';
import { HomePageComponent } from './components/homePage/home-page/home-page.component';
import { ResourcesComponent } from './components/homePage/resourcesPage/resources/resources.component';
import { LoginPageComponent } from './components/loginPage/login-page/login-page.component';
import { CreateAccountComponent } from './components/loginPageComponent/create-account/create-account.component';
import { PersonalUserDataComponent } from './components/personalDataPage/personal-user-data/personal-user-data.component';
import { ProductMovementsComponent } from './components/productManagerPage/moveProductPage/product-movements/product-movements.component';
import { AddProductComponent } from './components/productManagerPage/productPage/add-product/add-product.component';
import { EditProductComponent } from './components/productManagerPage/productPage/edit-product/edit-product.component';
import { NewTemplateComponent } from './components/productManagerPage/productPage/templatePages/new-template/new-template.component';
import { ProductInstructionComponent } from './components/productManagerPage/productPage/product-instruction/product-instruction.component';
import { ProductItemInfoComponent } from './components/productManagerPage/productPage/product-item-info/product-item-info.component';
import { ProductPageComponent } from './components/productManagerPage/productPage/product-page/product-page.component';
import { ProductsComponent } from './components/productManagerPage/productPage/products/products.component';
import { TemplateManagerComponent } from './components/productManagerPage/productPage/templatePages/template-manager/template-manager.component';
import { EditTemplateComponent } from './components/productManagerPage/productPage/templatePages/edit-template/edit-template.component';
import { ResponceManagerComponent } from './components/responces/responce-manager/responce-manager.component';
import { RoleSelectorComponent } from './components/roleSelectorComponent/role-selector/role-selector.component';
import { ServiceListComponent } from './components/servicesPage/service-list/service-list.component';
import { ServicesPageComponent } from './components/servicesPage/services-page/services-page.component';
import { AddUserComponent } from './components/userManagerPage/add-user/add-user.component';
import { UsersComponent } from './components/userManagerPage/users/users.component';
import { ServicesGuard } from './guards/services.guard';


const routes: Routes = [
  {path:"",component:HomePageComponent,pathMatch:"full"},
  {path:"login",component:LoginPageComponent},
  {path:"resources",component:ResourcesComponent},
  {path:"aboutUs",component:AboutUsComponent},
  {path:"contacts",component:ContactsComponent},
  {
    path:"services",
    component:ServicesPageComponent,
    canActivate : [ServicesGuard],
    children:[
      {path:"",component:ServiceListComponent},
      {path:"personal_data",component:PersonalUserDataComponent},
      {path:"users",component:UsersComponent},
      {path:"addUser",component:AddUserComponent},
      {
        path:"products", 
        component:ProductPageComponent,
        children:[
          {path:"",redirectTo:"instruction",pathMatch:"full"},
          {path:"instruction",component:ProductInstructionComponent},
          {path:"table",component:ProductsComponent},
          {path:"templates",component:TemplateManagerComponent},          
          {path:"edit",component:EditProductComponent},
          {path:"details",component:ProductItemInfoComponent},
          {path:"newTemplate", component: NewTemplateComponent},
          {path:"editTemplate", component: EditTemplateComponent}
        ]
      },   
      {path:"addProduct",component:AddProductComponent},
      {path:"addMovementProduct",component:ProductMovementsComponent}
    ]
  },
  {path:"responces",component:ResponceManagerComponent},
  {path:"createAccount",component:CreateAccountComponent},
  {path:'roleSelector',component:RoleSelectorComponent},
  {path:"**" ,redirectTo: '/'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
