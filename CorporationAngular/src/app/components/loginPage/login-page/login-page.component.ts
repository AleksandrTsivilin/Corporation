import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginForm } from 'src/app/interfaces/auth/loginForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm:LoginForm={
    username:"",
    password:""
  }

  isRunning:boolean=false;

  constructor(
    private readonly authService:AuthService,
    private readonly router:Router,
    private readonly toastr:ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){  
    this.isRunning=true;
    this.authService.login(this.loginForm)
      .subscribe(result=>{       
        this.toastr.success("authorization is success");
        this.isRunning=false;
        this.router.navigate(['services']);
      },(result)=>{
        this.toastr.error("user is not found")
        this.isRunning=false;
      })
  }

}
