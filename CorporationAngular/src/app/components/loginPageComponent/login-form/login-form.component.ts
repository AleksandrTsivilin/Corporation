import { Component, OnInit } from '@angular/core';
import { RegistrationForm } from 'src/app/interfaces/registrationForm';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  private registrationForm:RegistrationForm={
    username:"",
    password:""
  }
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.registrationForm={
      username:"admin",
      password:"admin"
    }
    console.log(this.registrationForm);
  }

}
