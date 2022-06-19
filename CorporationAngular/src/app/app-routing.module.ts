import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/homePage/aboutUs/about-us/about-us.component';
import { ContactsComponent } from './components/homePage/contactsPage/contacts/contacts.component';
import { HomePageComponent } from './components/homePage/home-page/home-page.component';
import { ResourcesComponent } from './components/homePage/resourcesPage/resources/resources.component';
import { LoginPageComponent } from './components/loginPage/login-page/login-page.component';
import { CreateAccountComponent } from './components/loginPageComponent/create-account/create-account.component';
import { LoginFormComponent } from './components/loginPageComponent/login-form/login-form.component';
import { InformationPageComponent } from './components/mainPageComponent/information-page/information-page.component';
import { RoleSelectorComponent } from './components/roleSelectorComponent/role-selector/role-selector.component';
import { RoleSelectorGuard } from './guards/role-selector.guard';

const routes: Routes = [
  {path:"",component:HomePageComponent,pathMatch:"full"},
  {path:"login",component:LoginPageComponent},
  {path:"resources",component:ResourcesComponent},
  {path:"aboutUs",component:AboutUsComponent},
  {path:"contacts",component:ContactsComponent},
  {
    path:"roleSelector",
    component:RoleSelectorComponent,
    canActivate : [RoleSelectorGuard]
  },
  // {path:"loginForm", component:LoginFormComponent},
  {path:"createAccount",component:CreateAccountComponent},
  {path:"**" ,redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
