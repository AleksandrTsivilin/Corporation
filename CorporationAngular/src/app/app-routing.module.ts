import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/loginPageComponent/login-form/login-form.component';
import { InformationPageComponent } from './components/mainPageComponent/information-page/information-page.component';
import { RoleSelectorComponent } from './components/roleSelectorComponent/role-selector/role-selector.component';

const routes: Routes = [
  {path:"",component:InformationPageComponent,pathMatch:"full"},
  {path:"roleSelector",component:RoleSelectorComponent},
  {path:"loginForm", component:LoginFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
