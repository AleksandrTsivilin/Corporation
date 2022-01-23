import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, NgForm } from '@angular/forms';
import { Permission, UserInfo } from 'src/app/interfaces/userInfo';
//import { EditUser} from 'src/app/interfaces/editUser';
import { PermissionAction} from 'src/app/interfaces/permissionAction';
import {Role} from 'src/app/interfaces/userInfo';
import { AvaiableUser } from 'src/app/interfaces/userManagerPage/avaiableUser';
import { RoleService } from 'src/app/services/userManager/roleServices/role.service';
import { RoleInfo } from 'src/app/interfaces/userManagerPage/roleInfo';



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
    avaiables:[]
  }

  @Output() updateUser=new EventEmitter();
  @Output() closeDialog=new EventEmitter();


  

  avaiablesUser:AvaiableUser[]=[];
  allRoles:RoleInfo [] = [];
  selectedRole:string="";
  

  constructor(private readonly roleService:RoleService) {   
   
  } 

  ngOnInit(): void {
    this.getAllRoles();
    
  }

  createPermissionsAction(
    permissionsUser:Permission[] ):PermissionAction[]{
      
    const allPermissions=this.getAllPermissions();
    
    let permissionsAction:PermissionAction[]=[];
    for (let  permission of allPermissions){
      
      if (permissionsUser!==null){
        permissionsAction.push(
          {
            id:0,
            title:permission,
            isSelected:permissionsUser.map(_=>_.title).includes(permission)
          })
      }
      
    }
    
    return permissionsAction;
  }

  close(){
    console.log(this.editUser)
    this.closeDialog.emit();
  }
  onSubmit(){
    let editRoles:Role[]=[];
    for (let avaiable of this.avaiablesUser){
      
      
      let editPermissions=this.getEditPermissions(avaiable.permissions);
      let editRole=this.getEditRole(avaiable.role.title,editPermissions as string[]);
      editRoles.push(editRole);
    }
    this.editUser.roles=editRoles;
    
    
    this.updateUser.emit();
    
  }
  getEditPermissions(permissionsAction:PermissionAction[]):string[]{
    return permissionsAction
      .filter(permissionAction=>permissionAction.isSelected)
      .map(permission=>permission.title) as string[];
  }
  getEditRole(role:string ,permissions:string[]):Role{
    console.log(role);
    console.log(permissions);
    let newPermissions:Permission[]=[];
    for (let permission of permissions){
      newPermissions.push({title:permission})
    }
    
    return {
      title:role,
      permissions:newPermissions,
      access: {title:""}
    };
  }

  onSelectRole(event:any){
    this.selectedRole=event.target.value;
    console.log(this.selectedRole);
  }

  addRole(){
   

    let permissionsAction:PermissionAction[]=[];
    for (let permission of this.getAllPermissions()){
      permissionsAction.push({id:0,title:permission, isSelected:false})
    }
    this.avaiablesUser.push({role:{id:0, title:this.selectedRole},permissions:permissionsAction,access:[]})
  }

  removeRole(index:number){
    this.avaiablesUser.splice(index,1);
  }
  //template methods
  getAllRoles(){
    this.roleService.getRoles()
      .subscribe(roles=>{
        this.allRoles = roles;
      })
  }  

  getAllPermissions():string[]{
    return ['create','read','update','delete']
  }

}
