
import { Component, OnInit } from '@angular/core';


import { PermissionAction } from 'src/app/interfaces/permissionAction';

import { Permission, Role } from 'src/app/interfaces/userInfo';
import { Access } from 'src/app/interfaces/userManagerPage/access';
import { AccessAction } from 'src/app/interfaces/userManagerPage/accessAction';
import { AvaiableUser } from 'src/app/interfaces/userManagerPage/avaiableUser';
import { NewUserWithRoles } from 'src/app/interfaces/userManagerPage/newUserWithRoles';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  
  newUserWithRole:NewUserWithRoles={
    fullname:"",
    username:"",
    password:"",
    email:"",
    roles:[]
  }
  
  employees:string [] = [];
  avaiableRoles:string [] = [];
  avaiableAccess:string [] = [];
  avaiablesUser:AvaiableUser={
    role:"",
    permissions:[],
    access:[]
  }
  
  confirmPassword:string="";
  isOpenRoleUserInfo:boolean=false;

  private selectedRole:string="";
  private permissions : Permission [] = [];
  private access : Access ={
    title:""
  };
  private hiddenRoleInfo:number[]=[];

  constructor(private readonly authService:AuthService) { }

  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllRoles();
    console.log(this.newUserWithRole.roles)
  }


  onSubmit(){
    //console.log(this.newUserWithRole);
    this.authService.addUserWithRole(this.newUserWithRole);
  }

  checkPassword():boolean{
    return this.newUserWithRole.password===this.confirmPassword;
  }



  onSelectRole(event:any){
    this.selectedRole=event.target.value;
    // console.log("onSelectRole")
    // console.log(event);
    // if (event.target.value==="add role") return;
    // console.log("go on")
    // const newRole = event.target.value;
    // this.createAvaiableUser(newRole);
    
  }

  isValidRole(){
    return this.newUserWithRole.roles.length>0;
  }
  isValidPermissions(){
    return  this.avaiablesUser.permissions
    .filter(_=>_.isSelected===true)
    .length >0;
  }

  isValidAccess(){
    return this.avaiablesUser.access
      .filter(_=>_.isSelected)
      .length>0;
  }

  addRole(){
    console.log("addRole")
    console.log(this.newUserWithRole)
    if (this.newUserWithRole.roles.map(r=>r.title).includes(this.selectedRole)) return;
    this.createAvaiableUser(this.selectedRole);    
  }

  close(){
    this.clearAvaiablesUser();
    console.log(this.newUserWithRole.roles)
    //this.getAllRoles();
    // this.avaiablesUser={
    //   role:"",
    //   permissions:[],
    //   access:[]
    // }
  }

  saveRole(){
    const selectedAvaiables : AvaiableUser={
      role:this.avaiablesUser.role,
      permissions:this.avaiablesUser.permissions.filter(p=>p.isSelected),
      access:this.avaiablesUser.access.filter(a=>a.isSelected)
    }
    this.permissions=[];
    for (let permission of selectedAvaiables.permissions){
      this.permissions.push({title:permission.title})
    }

    this.access.title= selectedAvaiables.access[0].title;
    
    console.log(this.newUserWithRole.roles);
    console.log(selectedAvaiables)
    this.newUserWithRole.roles.push({
      title:selectedAvaiables.role,
      permissions:this.permissions,
      access:this.access
    })

    console.log(this.newUserWithRole.roles);
    this.clearAvaiablesUser();
    // this.avaiablesUser={
    //   role:"",
    //   permissions:[],
    //   access:[]
    //}
  }

  openRole(){
    this.isOpenRoleUserInfo=true;
  }

  closeRoleUserInfoItem(index:number){
    console.log("closeRoleUser")
    this.hiddenRoleInfo.push(5);
  }

  checkHiddenRoleUserInfoItem(index:number){
    return !this.hiddenRoleInfo.includes(index);
  }

  removeRoleUserInfoItem(index:number){
    console.log("removeUserRole")
    console.log(this.newUserWithRole)
    const role=this.newUserWithRole.roles[index];
    console.log(role)
    this.newUserWithRole.roles=this.newUserWithRole.roles.filter(r=>r.title!==role.title);
    console.log(this.newUserWithRole)

    if (this.newUserWithRole.roles.length===0) this.isOpenRoleUserInfo=false;
  }

  private getAllEmployees() {
    this.employees=["Vasya Pupkin", "Oleg Titov"]
  }

  private getAllRoles(){
    this.avaiableRoles=["AdminManager","ProductManager"]
  }

  private getAllAccess():Access[]{
    return [{title:"Region"},{title:"Factory"}]
  }

  private createAvaiableUser(addedRole:string) {
    
    const permissions = this.getAllPermissions();
    const access = this.getAllAccess();
    let permissionsAction:PermissionAction[]=[];
    for (let permission of permissions){
      permissionsAction.push({title:permission.title, isSelected:false})
    }
    let accessAction:AccessAction[] = [];
    for (let acc of access ) {
      accessAction.push({title: acc.title, isSelected:false})
    }
    console.log(permissionsAction)
    
    this.avaiablesUser=
      {
        role:addedRole,
        permissions:permissionsAction,
        access:accessAction
    }
    console.log(this.newUserWithRole)
  }

  private getAllPermissions():Permission []{
    return [{title:"Create"},{title:"Read"},{title:"Update"},{title:"Delete"}]
  }

  private clearAvaiablesUser(){
    this.avaiablesUser={
      role:"",
      permissions:[],
      access:[]
    }
  }

}
