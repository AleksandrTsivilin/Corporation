import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginForm } from 'src/app/interfaces/auth/loginForm';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  
  loginForm:LoginForm={
    username:"",
    password:""
  }

  isRunning:boolean=false;
  constructor(
    private readonly authService:AuthService,
    private readonly router:Router,
    private readonly toastr:ToastrService) { console.log('constr login form ')}
  ngOnDestroy(): void {
    console.log('on destroy login form');
  }

  ngOnInit(): void {
  }
  onSubmit(){  
    this.isRunning=true;
    this.authService.login(this.loginForm)
      .subscribe(result=>{       
        this.toastr.success("authorization is success");
        this.isRunning=false;
        this.router.navigate(['roleSelector']);
      },(result)=>{
        this.toastr.error("user is not found")
        this.isRunning=false;
      })
  }

}
