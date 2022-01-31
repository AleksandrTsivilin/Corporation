import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewUser } from 'src/app/interfaces/auth/newUser';
import { AuthService } from 'src/app/services/auth.service';
import { UserUpdateService } from 'src/app/services/userManager/userServices/user-update.service';
//import { RegistrationForm } from 'src/app/interfaces/registrationForm';
interface RegistrationId{
  id:number
}
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  newUser:NewUser={
    registrationId:0,
    username:"",
    password:""
  }
  confirmPassword:string="";
  
  constructor
    ( private readonly route:ActivatedRoute,
      private readonly authService:AuthService,
      private readonly updateService:UserUpdateService
    ) { }

  ngOnInit(): void {
    this.route.queryParamMap
      
      .subscribe((params ) => {
        
        const id = params.get(" id");
        console.log(id)
        id !==null 
          ? this.newUser.registrationId = Number(id)
          : console.log("incorrect enter ");   
      }
    );
  }

  onSubmit(){
    this.authService.addUser(this.newUser)
    .subscribe(result=>{
      this.updateService.addedUser(result.department);
    })
  }
  isConfirmPassword(){
    return this.newUser.password===this.confirmPassword;
  }
}


