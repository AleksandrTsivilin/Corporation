import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/auth/loginForm';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  
  loginForm:LoginForm={
    username:"",
    password:""
  }
  constructor(private readonly authService:AuthService,
    private readonly router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.loginForm={
      username:"admin",
      password:"admin"
    }
    
    this.authService.login(this.loginForm)
      .subscribe(result=>{
        console.log(result.fullname);
        this.router.navigate(['roleSelector']);

      },()=>console.log("error auth"))
  }

}
