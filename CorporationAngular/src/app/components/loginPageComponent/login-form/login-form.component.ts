import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  constructor(
    private readonly authService:AuthService,
    private readonly router:Router,
    private readonly toastr:ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit(){    
    this.authService.login(this.loginForm)
      .subscribe(result=>{
        //console.log(result);        
        this.toastr.success("authorization is success");
        this.router.navigate(['roleSelector']);

      },(result)=>{
        this.toastr.error("user is not found")
      })
  }

}
