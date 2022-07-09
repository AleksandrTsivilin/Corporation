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
import { ProductsComponent } from './components/productManagerPage/productPage/products/products.component';
import { RoleSelectorComponent } from './components/roleSelectorComponent/role-selector/role-selector.component';
import { ServiceListComponent } from './components/servicesPage/service-list/service-list.component';
import { ServicesPageComponent } from './components/servicesPage/services-page/services-page.component';
import { AddUserComponent } from './components/userManagerPage/add-user/add-user.component';
import { UsersComponent } from './components/userManagerPage/users/users.component';
import { RoleSelectorGuard } from './guards/role-selector.guard';

const routes: Routes = [
  {path:"",component:HomePageComponent,pathMatch:"full"},
  {path:"login",component:LoginPageComponent},
  {path:"resources",component:ResourcesComponent},
  {path:"aboutUs",component:AboutUsComponent},
  {path:"contacts",component:ContactsComponent},
  {
    path:"services",
    component:ServicesPageComponent,
    canActivate : [RoleSelectorGuard],
    children:[
      {path:"",component:ServiceListComponent},
      {path:"personal_data",component:PersonalUserDataComponent},
      {path:"users",component:UsersComponent},
      {path:"addUser",component:AddUserComponent},
      {path:"products",component:ProductsComponent},   
      {path:"addProduct",component:AddProductComponent},
      {path:"addMovementProduct",component:ProductMovementsComponent}
    ]
  },
  {path:"createAccount",component:CreateAccountComponent},
  {path:'roleSelector',component:RoleSelectorComponent},
  {path:"**" ,redirectTo: '/'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
