import { Component, Input, OnInit } from '@angular/core';
import { DataUser } from 'src/app/interfaces/dataUser';
import { UserService } from 'src/app/services/adminPage/user.service';
import { UserInfo } from 'src/app/interfaces/userInfo';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input () dataUser:DataUser={
    id:null,
    roles:null,
    permissions:null
  }

  userInfos:UserInfo[]=[];
  tableHeaders:string[]=["#","username","firstname","roles","action"]
  
  constructor(private readonly userService:UserService) { }

  ngOnInit(): void {
    if (this.dataUser.id !==null) {
      this.userService.getUsers(this.dataUser.id)
        .subscribe((result)=>{
          this.userInfos=result;
          console.log(this.userInfos)
        },
        ()=>{console.log("getUser failed")})
    }    
  }

  canEdit():boolean | undefined{
    return this.dataUser?.permissions?.includes("update");
  }

  canDelete():boolean | undefined{
    return this.dataUser?.permissions?.includes("delete");
  }

  edit(){
    console.log("edit user");
  }

  remove(userId:number | null){
    console.log(userId)
    this.userService.remove(userId)
      ?.subscribe((result)=>
      {
        console.log("user removed");
      },
      ()=>{})
  }
}
