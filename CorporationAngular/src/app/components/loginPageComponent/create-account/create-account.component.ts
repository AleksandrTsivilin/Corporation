import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewUser } from 'src/app/interfaces/auth/newUser';
import { AuthService } from 'src/app/services/auth.service';
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
    regId:0,
    username:"",
    password:"",
    email:""
  }

  private regId:RegistrationId={
    id:0
  }
  constructor
    ( private readonly route:ActivatedRoute,
      private readonly authService:AuthService
    ) { }

  ngOnInit(): void {
    this.route.queryParamMap
      
      .subscribe((params ) => {
        
        const id = params.get(" id");
        id !==null 
          ? this.newUser.regId = Number(id)
          : console.log("incorrect enter ");   
      }
    );
  }

  onSubmit(){
    this.authService.addUser(this.newUser);
  }
}


