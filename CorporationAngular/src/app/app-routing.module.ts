import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformationPageComponent } from './components/mainPageComponent/information-page/information-page.component';
import { RoleSelectorComponent } from './components/roleSelectorComponent/role-selector/role-selector.component';

const routes: Routes = [
  {path:"",component:InformationPageComponent,pathMatch:"full"},
  {path:"roleSelector",component:RoleSelectorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
