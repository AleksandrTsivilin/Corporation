import { Component, OnInit, Output } from '@angular/core';
import { AvaiablesPermissions } from 'src/app/interfaces/avaiablesPermissions';
//import { DataUser } from 'src/app/interfaces/dataUser';
import { UserInfo } from 'src/app/interfaces/userInfo';
import { Permission } from 'src/app/interfaces/userInfo';

@Component({
  selector: 'app-role-selector',
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.scss']
})
export class RoleSelectorComponent implements OnInit {

  user:UserInfo={
    id:0,
    username:"",
    firstname:"",
    roles:[]
  }

  private avaiablesPermissions:AvaiablesPermissions={
    canCreate:false,
    canRead:false,
    canUpdate:false,
    canDelete:false,
    canMove:false
  }

  // dataUser:DataUser={
  //   id:null,
  //   roles:null,
  //   permissions:null
  // } 

  isSelected:boolean=false;
  modeSelector:string="";
  constructor() { }

  ngOnInit(): void {
    this.isSelected=false;
    //this.dataUser=this.getDataUser();

    this.user=this.getUser();    
  }

  getAvaiablesPermissions(selectedRole:string):AvaiablesPermissions{
    const permissionTitles=this.user.roles
      .filter(role=>role.title===selectedRole)
      .map(role=>role.permissions)[0]
      .map(permission=>permission.title);
    return {
      canCreate:permissionTitles.includes("create"),
      canRead:permissionTitles.includes("read") || 
        permissionTitles.includes("update") ||
        permissionTitles.includes("delete"),
      canUpdate:permissionTitles.includes("update"),
      canDelete:permissionTitles.includes("delete"),
      canMove:permissionTitles.includes("move")
    }
  }

  // canCreate():boolean {       
  //   return this.permissions
  //     .map(permission=>permission.title)
  //     .includes("create");
    
  // }
  onSelect(selected:string){
    console.log("onSelectedService");
    this.modeSelector=selected;
    this.isSelected=true;
  }
  
  getPermissions(selectedRole:string):Permission[]{
    return this.user.roles
      .filter(role=>role.title===selectedRole)
      .map(_=>_.permissions)[0];
    //console.log(a);
    //return [];
    //return this.user.roles.filter(role=>role.title==="AdminManager");
  }

  

  exit(){
    this.isSelected=false;
  }

  //template methods


  getUser():UserInfo{
    return {
      id:1,
      username:"UserMax",
      firstname:"Max",
      roles:[{
        title:"AdminManager",
        permissions:[{title:"create"},{title:"read"},{title:"update"},{title:"delete"}]
      },{
        title:"ProductManager",
        permissions:[{title:"create"},{title:"read"},{title:"update"},{title:"delete"},{title:"move"}]
      }]
    }
  }

  // getDataUser():DataUser{
  //   return {
  //     id:1,
  //     roles:["AdminManager","ProductManager"],
  //     permissions:["create","read","update","delete"]
  //   }
  // }

}
