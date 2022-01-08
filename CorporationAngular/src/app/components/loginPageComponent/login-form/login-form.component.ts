import { Component, OnInit } from '@angular/core';
import { RegistrationForm } from 'src/app/interfaces/registrationForm';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  registrationForm:RegistrationForm={
    username:"",
    password:""
  }
  constructor(private readonly authService:AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.registrationForm={
      username:"admin",
      password:"admin"
    }
    console.log(this.registrationForm);
    this.authService.login(this.registrationForm)
      .subscribe(result=>{
        console.log(result.fullname)

      },()=>console.log("error auth"))
  }

}
