import { Component, Input, OnInit } from '@angular/core';
import { DataUser } from 'src/app/interfaces/dataUser';
import { UserService } from 'src/app/services/adminPage/user.service';
import { UserInfo } from 'src/app/interfaces/userInfo';
import { HeaderTable } from 'src/app/interfaces/header-table';





// interface HeaderActive{
//   header:string,
//   isActive:boolean
// }

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

  usersInfo:UserInfo[]=[];

  headersTable:HeaderTable[]=[];

  editUserMode:boolean=false;  
  
  editUser:UserInfo={
    id:0,
    username:"",
    firstname:"",
    roles:[]
  }

  isOpenUserInfo:boolean=false;
  
  private _ascDirection = 1;
  private _sortCriteria="";
  
  
  
  constructor(private readonly userService:UserService) {   
       
  }
  
  ngOnInit(): void {
    if (this.dataUser.id !==null) {
      this.userService.getUsers(this.dataUser.id)
        .subscribe((result)=>{
          this.usersInfo=result;
        },
        ()=>{console.log("getUser failed")})
    } 
    this.headersTable=this.getHeadersTable(); 
    console.log(this.dataUser)   
  }

  isActiveHeader(isActive:Boolean):Boolean{
    return isActive;
  }

  sortCol(criteria:string){
    console.log("sortBy");
    criteria===this._sortCriteria
      ? this._ascDirection *= -1
      : this._ascDirection = 1;
    
    this._sortCriteria=criteria;
    let orderedUsersInfo= this.usersInfo.sort((a:UserInfo,b:UserInfo)=>{
      let orderItemFirst=a[criteria];
      let orderItemSecond=b[criteria];
      const less = -1 * this._ascDirection;
      const more = 1 * this._ascDirection;

      if (typeof orderItemFirst === 'string') {
        return orderItemFirst.toLowerCase() <= orderItemSecond.toLowerCase() ? less : more;
      } else {
        return orderedUsersInfo <= orderItemSecond ? less : more;
      }
      
    })
    this.usersInfo=orderedUsersInfo;
  }

  

  edit(rawUserInfo:UserInfo){
    this.editUser={
      id:rawUserInfo.id,
      username:rawUserInfo.username,
      firstname:rawUserInfo.firstname,
      roles:rawUserInfo.roles
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

  openUserInfo(selectedUser:UserInfo){
    console.log("open user info");
    this.isOpenUserInfo=true;
    this.editUser={
      id:selectedUser.id,
      username:selectedUser.username,
      firstname:selectedUser.firstname,
      roles:selectedUser.roles
    }
  }

  closeUserInfo(){
    this.isOpenUserInfo=false;
  }

  private getHeadersTable():HeaderTable[]{
    const headers= [{
      title:'#',
      isActive:false
    },
    {
      title:"username",
      isActive:true
    },{
      title:"firstname",
      isActive:true
    }];

    if (this.dataUser?.permissions?.includes("update")){
      headers.push({title:"edit",isActive:false})
    }

    if (this.dataUser?.permissions?.includes("delete")){
      headers.push({title:"delete",isActive:false})
    }
    return headers;
  }
}
