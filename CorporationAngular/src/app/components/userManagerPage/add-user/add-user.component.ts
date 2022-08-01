
import { Component, OnInit } from '@angular/core';
import { AvaiableUserForm } from 'src/app/interfaces/auth/avaiablesUserN';
import { EmployeeInfo } from 'src/app/interfaces/employee/employeeInfo';
import { PermissionAction } from 'src/app/interfaces/permissionAction';
import { AccessInfo } from 'src/app/interfaces/userManagerPage/accessInfo';
import { AvaiableUserAction } from 'src/app/interfaces/userManagerPage/avaiableUserAction';
import { NewUserWithAvaiables } from 'src/app/interfaces/userManagerPage/newUserWithAvaiables';
import { PermissionInfo } from 'src/app/interfaces/userManagerPage/permissionInfo';
import { RoleInfo } from 'src/app/interfaces/userManagerPage/roleInfo';

import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employeeManager/employee.service';
import { TabService } from 'src/app/services/tab.service';
import { AccessService } from 'src/app/services/userManager/accessServices/access.service';
import { PermissionService } from 'src/app/services/userManager/permissionServices/permission.service';
import { RoleService } from 'src/app/services/userManager/roleServices/role.service';
import { UserUpdateService } from 'src/app/services/userManager/userServices/user-update.service';

interface CurrentAvaiables{
  role:string,
  access:string,
  permissions:string[]
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {  


  newUserWithAvaiables:NewUserWithAvaiables={
    employeeId:null,
    username:"",
    password:"",
    avaiables:[]
  }

  confirmPassword:string="";

  employees:EmployeeInfo[]=[];

  avaiableUser:AvaiableUserForm={
    roleId:null,
    accessId:0,
    permissionsId:[]
  }

  currentAvaiables:CurrentAvaiables[]=[];
  avaiableAction:AvaiableUserAction[] = [];
  newAvaiableAction:AvaiableUserAction = {
    role:{id:0,title:""},
    permissions:[],
    accessId:0
  }

  permissionsAction:PermissionAction[] =[];
  
  isCreateAvaiables:boolean=false;
  isOpenAvaiablesInfo:boolean=false;
  selectedRole:RoleInfo={
    id: 0,
    title:""

  }

  allRoles:RoleInfo [] = [];
  private allPermissions:PermissionInfo[]=[];
  allAccesses:AccessInfo[]=[];
  constructor(
    private readonly authService:AuthService,
    private readonly employeeService:EmployeeService,
    private readonly roleService:RoleService,
    private readonly permissionService:PermissionService,
    private readonly accessService:AccessService,
    private readonly updateService:UserUpdateService,
    private readonly tabService:TabService
    ) {
      // tabService.addedTab({
      //   title: "add user",
      //   router: "/services/addUser",
      //   additional: "",
      //   key: undefined
      // })
     }

  ngOnInit(): void {
    this.getAllEmployeesNonUser();
    this.getAllRoles();
    this.getAllPermissions();
    this.getAllAccess();
  }

  checkPassword(){
    return this.newUserWithAvaiables.password===this.confirmPassword;
  }

  isValidAvaiables(){
    return this.newUserWithAvaiables.avaiables.length>0;
  }

  onSelectRole(event:any){
    const index = Number ( event.target.value);
    this.selectedRole = this.allRoles.filter(r=>r.id===index)[0];
    if (this.isHasRole(index)) return;
    this.createAvaiablesUser();

  }
  onSubmit(){
    this.updateService.addUserWithAvaiables(this.newUserWithAvaiables);
    this.newUserWithAvaiables.avaiables=[];
    this.isOpenAvaiablesInfo=false;
  }

  isValidPermissions(){
    return this.permissionsAction
      .filter(p=>p.isSelected)
      .length>0;
  }

  isValidAccess(){
    return this.newAvaiableAction.accessId!=0;
  }
  saveRole(){
    this.isCreateAvaiables=false;
    const selectedAccess= this.allAccesses
      .filter(access=>access.id===this.newAvaiableAction.accessId)[0];
    const selectedPermissions=this.permissionsAction.filter(p=>p.isSelected);
    this.newUserWithAvaiables.avaiables
      .push({
        roleId:this.selectedRole.id,
        accessId:selectedAccess.id,
        permissionsId:selectedPermissions.map(p=>p.id)
      });
    console.log(this.newUserWithAvaiables)
    this.currentAvaiables.push({
      role:this.selectedRole.title,
      access:selectedAccess.title, 
      permissions:selectedPermissions.map(p=>p.title)
    })
  }
  closeCreateRole(){
    this.isCreateAvaiables=false;
  }

  openAvaiablesInfo(){
    this.isOpenAvaiablesInfo=true;
  }

  closeAvaiablesInfo(){
    this.isOpenAvaiablesInfo=false;
  }

  removeAvaiable(role:string){    
    this.currentAvaiables=this.currentAvaiables.filter(a=>a.role!==role);
    const id = this.allRoles.filter(r=>r.title===role).map(r=>r.id)[0];
    this.newUserWithAvaiables.avaiables = this.newUserWithAvaiables.avaiables.filter(a=>a.roleId!==id);
    if (this.currentAvaiables.length===0) this.isOpenAvaiablesInfo=false;
  }

  private createAvaiablesUser(){
    
    this.isCreateAvaiables=true;
    

    this.permissionsAction=[];
    for (let permission of this.allPermissions){
      this.permissionsAction.push({
        id:permission.id,
        title: permission.title,
        isSelected:false
      })
    }
    
    this.newAvaiableAction.permissions=this.permissionsAction;
    this.newAvaiableAction.role=this.selectedRole;
    this.newAvaiableAction.accessId=0;
  }

  private isHasRole(roleId:number){
    return this.newUserWithAvaiables.avaiables
      .map(a=>a.roleId)
      .includes(roleId);
  }
  private getAllEmployeesNonUser(){
    this.employeeService.getEmployeesNonUser()
      .subscribe(employees=>{
        this.employees=employees;
      })
  }

  private getAllRoles(){
    this.roleService.getRoles()
      .subscribe(roles=>{
        this.allRoles=roles;
      })
  }
  private getAllPermissions(){
    this.permissionService.getPermissions().
      subscribe(permission=>{
        this.allPermissions=permission;
      })
  }

  private getAllAccess(){
    this.accessService.getAccesses()
      .subscribe(accesses=>{
        this.allAccesses=accesses;
      })
  }
}
