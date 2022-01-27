import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { UserInfo } from 'src/app/interfaces/userInfo';

import { PermissionAction} from 'src/app/interfaces/permissionAction';

import { RoleService } from 'src/app/services/userManager/roleServices/role.service';
import { RoleInfo } from 'src/app/interfaces/userManagerPage/roleInfo';
import { AvaiableUserForm } from 'src/app/interfaces/auth/avaiablesUserN';
import { PermissionInfo } from 'src/app/interfaces/userManagerPage/permissionInfo';
import { PermissionService } from 'src/app/services/userManager/permissionServices/permission.service';

import { AccessInfo } from 'src/app/interfaces/userManagerPage/accessInfo';
import { AccessService } from 'src/app/services/userManager/accessServices/access.service';

import { AvaiableUserAction } from 'src/app/interfaces/userManagerPage/avaiableUserAction';
import { AvaiableUser } from 'src/app/interfaces/auth/avaiablesUserForm';
import { NewUserWithAvaiables } from 'src/app/interfaces/userManagerPage/newUserWithAvaiables';






@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {



  @Input () editUser:UserInfo={
    id:0,
    username:"",
    employee:{id:0,lastname:"",firstname:""},
    avaiables:[],
    fullname:null
  }

  @Output() updateUser=new EventEmitter<AvaiableUserForm[]>();
  @Output() closeDialog=new EventEmitter();

  newAvaiableUser:AvaiableUserForm={
    roleId:null,
    permissionsId:[],
    accessId:0
  }
  avaiablesAction:AvaiableUserAction[]=[];
  newAvaiableAction:AvaiableUserAction={
    role:{id:0,title:""},
    permissions:[],
    accessId:0
  }
  
  allRoles:RoleInfo [] = [];
  
  private allPermissions:PermissionInfo [] = [];
  allAccesses:AccessInfo [] = [];
  isOpenCreateAvaiable:boolean =false;
 


  constructor(
    private readonly roleService:RoleService,
    private readonly permissionService:PermissionService,
    private readonly accessService:AccessService) {

  }

  ngOnInit(): void {   
    this.getAllPermissions();
    this.getAllAccesses();
  }
  
  closePage(){
    this.closeDialog.emit();
  }
  onSubmit(){
    let avaiables = [] as AvaiableUserForm[];
    this.avaiablesAction.forEach(avaiableAction=>{
      avaiables.push({
        roleId:avaiableAction.role.id,
        permissionsId:avaiableAction.permissions
        .filter(permission=>permission.isSelected)
        .map(permission=>permission.id),
        accessId:avaiableAction.accessId
      })
    })
    this.updateUser.emit(avaiables)
    
  }
  

  startAddAvaiables(){
    this.isOpenCreateAvaiable=true;
    this.getAllRole();    
    const permissionsAction = this.getPermissionsAction([])
    
    this.newAvaiableAction={
      role:{id:0,title:""},
      permissions:permissionsAction,
      accessId:0
    }
  }

  saveNewAvaiable(){
    this.isOpenCreateAvaiable=false;
    this.addAvaiableUser(this.newAvaiableAction);
  }

  onSelectRole(event : any){
    const roleId=Number(event.target.value);
    if ( this.isHasRole(roleId)) return;
    this.newAvaiableAction.role=this.allRoles
    .filter(role=>role.id===roleId)[0];
    
  }

  removeAvaiable(roleId:number){
    this.avaiablesAction = this.avaiablesAction
    .filter(avaiable=>avaiable.role.id!==roleId)
  }
 
  private createAvaiablesUser(avaiables:AvaiableUser[]){
    this.avaiablesAction=[];
    avaiables.forEach(avaiable => {
      const permissionsAction=this.getPermissionsAction(avaiable.permissions); 
      
      this.addAvaiableAction(avaiable.role,permissionsAction,avaiable.access.id);
      // this.avaiablesAction.push({
      //   role:avaiable.role,
      //   permissions:permissionsAction,
      //   accessId:avaiable.access.id
      // })
    });
  }

  private getPermissionsAction(permissions:PermissionInfo[])
    :PermissionAction[]{
    
      let permissionsAction=[] as PermissionAction[];
      this.allPermissions.forEach(permission=>{
        const isHasPermission=permissions
          .map(permission=>permission.id)
          .includes(permission.id)
          
        permissionsAction.push({
          id:permission.id,
          title:permission.title,
          isSelected:isHasPermission
        })
      })

      return permissionsAction;
  }

  private isHasRole(roleid:number):boolean{
    return this.avaiablesAction
    .map(avaiable=>avaiable.role.id)
    .includes(roleid)    
  }
  private addAvaiableUser(avaiable:AvaiableUserAction){
    const permissionsAction=[] as PermissionAction[];
    avaiable.permissions.map(
    permission=>permissionsAction.push({
      id:permission.id,
      title:permission.title,
      isSelected:permission.isSelected
    }));
    this.addAvaiableAction(avaiable.role,permissionsAction,avaiable.accessId)
    // this.avaiablesAction.push({
    //   role:avaiable.role,
    //   permissions: permissionsAction,
    //   accessId:avaiable.accessId
    // })
  }
  private addAvaiableAction(
    role:RoleInfo,
    permissions:PermissionAction[],
    accessId:number
  ){
    this.avaiablesAction.push({
      role:role,
      permissions:permissions,
      accessId:accessId
    })
  }
  private getAllPermissions() {
    this.permissionService.getPermissions()
      .subscribe(permissions=>{
        this.allPermissions=permissions
        this.createAvaiablesUser(this.editUser.avaiables);
      })
  }
  private getAllAccesses(){
    this.accessService.getAccesses()
      .subscribe(accesses=>{
        this.allAccesses = accesses;
        this.createAvaiablesUser(this.editUser.avaiables);
      })
  }
  private getAllRole(){
    this.roleService.getRoles()
      .subscribe(roles=>{
        this.allRoles=roles
      })
  }

}
