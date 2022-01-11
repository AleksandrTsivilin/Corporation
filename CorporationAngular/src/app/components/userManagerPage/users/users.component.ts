import { Component, Input, OnInit, Output } from '@angular/core';
//import { DataUser } from 'src/app/interfaces/dataUser';
import { UserService } from 'src/app/services/adminPage/user.service';
import { UserInfo } from 'src/app/interfaces/userInfo';
import { HeaderTable } from 'src/app/interfaces/header-table';
import { Permission } from 'src/app/interfaces/userInfo';
import { AvaiablesPermissions } from 'src/app/interfaces/avaiablesPermissions';
import { PageState } from 'src/app/interfaces/pageState';




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

  // @Input () dataUser:DataUser={
  //   id:null,
  //   roles:null,
  //   permissions:null
  // }

  @Input () userId:number=0;
  //@Input () permissions:Permission[]=[];

  @Input() @Output() avaiablesPermissions:AvaiablesPermissions={
    canCreate:false,
    canRead:false,
    canUpdate:false,
    canDelete:false,
    canMove:false
  }
  //@Input () userId:number=0;
  // @Input () permissions:Permission[]=[];

  usersInfo:UserInfo[]=[];

  headersTable:HeaderTable[]=[];

  pageState:PageState={
    path:"loadingPage",
    isActive:false
  }

  //editUserMode:boolean=false;  
  
  editUser:UserInfo={
    id:0,
    username:"",
    firstname:"",
    roles:[]
  }

  //isOpenUserInfo:boolean=false;
  
  private _ascDirection = 1;
  private _sortCriteria="";
  
  
  
  constructor(private readonly userService:UserService) {   
       
  }
  
  ngOnInit(): void {
    this.getUsers();
    console.log(this.avaiablesPermissions)
    
    
    this.headersTable=this.getHeadersTable(); 
    //console.log(this.dataUser)   
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

  

  startEdit(rawUserInfo:UserInfo){
    this.editUser={
      id:rawUserInfo.id,
      username:rawUserInfo.username,
      firstname:rawUserInfo.firstname,
      roles:rawUserInfo.roles
    }
    //this.editUserMode=true;
    this.pageState={
      path:"editUser",
      isActive:false
    }
  }

  update(){
    console.log("update in usersComponent")
    console.log(this.editUser);
    this.closeDialog();
    // this.userService.update(this.editUser)
    //   .subscribe(()=>{
        
    //   })
    //this.editUserMode=false;
    // this.pageState={
    //   path:"",
    //   isActive:true
    // }

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
    //this.isOpenUserInfo=true;
    this.pageState={
      path:"dialogUserInfo",
      isActive:false
    }
    this.editUser={
      id:selectedUser.id,
      username:selectedUser.username,
      firstname:selectedUser.firstname,
      roles:selectedUser.roles
    }
  }

  
  closeDialog(){
    this.pageState={
      path:"",
      isActive:true
    }
  }

  private getUsers() {
    this.userService.getUsers(this.userId)
        .subscribe((result)=>{
          this.usersInfo=result;
          this.setStatePage("",true);
        },
        ()=>{
          this.setStatePage("responce500",false)
      })
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

    if (this.avaiablesPermissions.canUpdate) {
      headers.push({title:"edit",isActive:false});
    }

    if (this.avaiablesPermissions.canDelete) {
      headers.push({title:"delete",isActive:false})
    }
    return headers;
  }

  private setStatePage(path:string, isActive:boolean){
    this.pageState={
      path:path,
      isActive:isActive
    }
  }
}
