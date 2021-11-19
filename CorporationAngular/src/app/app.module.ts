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
    EditUserComponent
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
