import { Component, Input, OnInit } from '@angular/core';
import { DataUser } from 'src/app/interfaces/dataUser';
import { UserService } from 'src/app/services/adminPage/user.service';

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
  users:string []=[]
  constructor(private readonly userService:UserService) { }

  ngOnInit(): void {
    if (this.dataUser.id !==null) {
      this.userService.getUsers(this.dataUser.id)
        .subscribe((result)=>{
          this.users=result;
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

  remove(){
    console.log("remove user");
  }

  // template methods

  getUsers(userId:number): string[]{
    return  ["aa","bb","cc"]
  }

}
