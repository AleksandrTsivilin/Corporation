import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/appComponent/app.component';
import { MainPageComponent } from './components/mainPageComponent/main-page/main-page.component';
import { RoleSelectorComponent } from './components/roleSelectorComponent/role-selector/role-selector.component';
import { InformationPageComponent } from './components/mainPageComponent/information-page/information-page.component';
import { LoginFormComponent } from './components/loginPageComponent/login-form/login-form.component';
import { AdminManagerComponent } from './components/adminPage/admin-manager/admin-manager.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    RoleSelectorComponent,
    InformationPageComponent,
    LoginFormComponent,
    AdminManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
