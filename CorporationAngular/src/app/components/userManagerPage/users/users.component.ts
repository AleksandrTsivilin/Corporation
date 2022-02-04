import { Component, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/userManager/userServices/user.service';
import { UserInfo } from 'src/app/interfaces/userInfo';
import { HeaderTable } from 'src/app/interfaces/header-table';
import { AvaiablesPermissions } from 'src/app/interfaces/avaiablesPermissions';
import { PageState } from 'src/app/interfaces/pageState';
import { UserUpdateService } from 'src/app/services/userManager/userServices/user-update.service';






@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  

  @Input () userId:number=0;
  

  @Input() @Output() avaiablesPermissions:AvaiablesPermissions={
    canCreate:false,
    canRead:false,
    canUpdate:false,
    canDelete:false,
    canMove:false
  }
  

  usersInfo:UserInfo[]=[];

  headersTable:HeaderTable[]=[];

  pageState:PageState={
    path:"loadingPage",
    isActive:false
  }

  
  editUser:UserInfo={
    id: 0,
    username: "",
    employee:{id:0,lastname:"",firstname:""},
    avaiables: [],
    fullname:null,
    department:{id:0,title:""},
    isBanned:false
  }

  
  private _ascDirection = 1;
  private _sortCriteria="";
  
  
  
  constructor(
    private readonly userService:UserService,
    private readonly updateService:UserUpdateService) {   
  }
  
  ngOnInit(): void {
    this.getUsers();
    this.headersTable=this.getHeadersTable(); 
    this.updateService.changesDepartmentUser$.subscribe(changedDepartment=>{
      const checkChanges = this.usersInfo.map(user=>user.department.id)
        .includes(changedDepartment);
      if (checkChanges) this.getUsers();
    }) 
  }
  

  

  sortCol(header:HeaderTable){
   
    if (!header.isActive) return;
    let criteria = header.title;

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
      }     
      else {        
        return orderItemFirst.title <= orderItemSecond.title ? less : more;
      }
      
    })
    this.usersInfo=orderedUsersInfo;
  }  

  startEdit(rawUserInfo:UserInfo){
    this.editUser={
      id:rawUserInfo.id,
      username:rawUserInfo.username,
      employee:rawUserInfo.employee,
      avaiables:rawUserInfo.avaiables,
      fullname:null,
      department:{id:0,title:""},
      isBanned:false
    }
    this.setStatePage("editUser",false);
  }

  update(avaiables :any){ 
    this.updateService.updateUser(avaiables,this.editUser.id);   
    this.closeDialog();
    
  }

  remove(userId:number){
    console.log(userId)
    this.updateService.banUser(userId);
    // this.userService.remove(userId)
    //   ?.subscribe((result)=>
    //   {
    //     console.log("user removed");
    //   },
    //   ()=>{})
  }

  openUserInfo(selectedUser:UserInfo){
    this.setStatePage("dialogUserInfo",false)
   
    this.editUser={
      id:selectedUser.id,
      username:selectedUser.username,
      employee:selectedUser.employee,
      avaiables:selectedUser.avaiables,
      fullname:null,
      department:{id:0,title:""},
      isBanned:false
    }
  }

  
  closeDialog(){
    this.setStatePage("",true);
  }

  private getUsers() {
    this.userService.getUsersByAccess()
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
      title:"fullname",
      isActive:true
    },{
      title:"department",
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
