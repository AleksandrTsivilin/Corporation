import { Component, Input, OnInit } from '@angular/core';
import { DataUser } from 'src/app/interfaces/dataUser';
import { UserService } from 'src/app/services/adminPage/user.service';
import { UserInfo } from 'src/app/interfaces/userInfo';
import { EditUser } from 'src/app/interfaces/editUser';


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
  tableHeaders:string[]=["#","username","firstname","roles","action"];
  editUserMode:boolean=false;

  // editUser:UserInfo={
  //   id: null,
  //   username: null,
  //   roles: null,
  //   firstname:null
  // }

  editUser:EditUser={
    id:null,
    roles:null
  }
  
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

  edit(editUser:UserInfo){
    // this.editUser={
    //   id:editUser.id,
    //   firstname:editUser.firstname,
    //   username:editUser.username,
    //   roles:editUser.roles
    // }

    this.editUser={
      id:1,
      roles:[
        {title:"role 1",permissions:[{title:"per 1",isSelected:false}]},
        {title:"role 2",permissions:[{title:"per 1",isSelected:true},{title:"per 2",isSelected:false}]}
      ]
    }
    this.editUserMode=true;
  }

  update(){
    console.log("update in usersComponent")
    console.log(this.editUser);
    // this.userService.update(this.editUser)
    //   .subscribe(()=>{
        
    //   })
    // this.editUserMode=false;

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
