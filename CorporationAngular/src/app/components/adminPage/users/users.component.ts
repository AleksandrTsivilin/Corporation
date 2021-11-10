import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input () userId:number | null =null;
  @Input () permissions:string[] =[];
  users:string []=[]
  constructor() { }

  ngOnInit(): void {
    console.log(this.userId)
    console.log(this.permissions);
    if (this.userId !==null) {
      this.users=this.getUsers(this.userId);
    }
  
    
  }

  canEdit():boolean{
    return this.permissions.includes("update");
  }

  canDelete():boolean{
    return this.permissions.includes("delete");
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
