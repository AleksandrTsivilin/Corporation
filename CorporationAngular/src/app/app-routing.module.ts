import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './components/loginPageComponent/create-account/create-account.component';
import { LoginFormComponent } from './components/loginPageComponent/login-form/login-form.component';
import { InformationPageComponent } from './components/mainPageComponent/information-page/information-page.component';
import { RoleSelectorComponent } from './components/roleSelectorComponent/role-selector/role-selector.component';
import { RoleSelectorGuard } from './guards/role-selector.guard';

const routes: Routes = [
  {path:"",component:InformationPageComponent,pathMatch:"full"},
  {
    path:"roleSelector",
    component:RoleSelectorComponent,
    canActivate : [RoleSelectorGuard]
  },
  {path:"loginForm", component:LoginFormComponent},
  {path:"createAccount",component:CreateAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
