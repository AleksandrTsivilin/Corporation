import { Component, OnInit, Output } from '@angular/core';
import { AvaiablesPermissions } from 'src/app/interfaces/avaiablesPermissions';
import { PageState } from 'src/app/interfaces/pageState';
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

  pageState:PageState={
    path:"",
    isActive:true
  }

  openedTabs:string []=[];

  // dataUser:DataUser={
  //   id:null,
  //   roles:null,
  //   permissions:null
  // } 

  //isSelected:boolean=false;
  //modeSelector:string="";
  constructor() { }

  ngOnInit(): void {
    //this.isSelected=false;
    //this.dataUser=this.getDataUser();

    this.user=this.getUser();    
  }

  checkRole(title:string){    
    return this.user.roles
      .map(r=>r.title)
      .includes(title);
    
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
  changeModePage(path:string){
    this.pageState={
      path:path,
      isActive:false
    }
    if (!this.openedTabs.includes(path))
        this.openedTabs.push(path);
  }

  // addTab(title:string){
  //   if (!this.openedTabs.includes(title))
  //       this.openedTabs.push(title);
  // }

  returnToSelector(){
    this.pageState={
      path:"",
      isActive:true
    }
  }
  moveToTab(title:string){
    console.log(title)
    this.pageState={
      path:title,
      isActive:false
    }
  }
  closeTab(title:string){
    const indexTab=this.openedTabs.indexOf(title);
    this.openedTabs=this.openedTabs.filter(tab=>tab!==title);
    if (this.openedTabs.length===0) 
    {
      this.returnToSelector();
      return;
    }
    
    indexTab === this.openedTabs.length
      ?this.moveToTab( this.openedTabs[(this.openedTabs.length-1)])
      :this.moveToTab(this.openedTabs[indexTab]);     
    
    
  }
  // canCreate():boolean {       
  //   return this.permissions
  //     .map(permission=>permission.title)
  //     .includes("create");
    
  // }
  onSelect(selected:string){
    console.log("onSelectedService");
    //this.modeSelector=selected;
    //this.isSelected=true;
  }
  
  getPermissions(selectedRole:string):Permission[]{
    return this.user.roles
      .filter(role=>role.title===selectedRole)
      .map(_=>_.permissions)[0];    
  }

  

  // exit(){
  //   this.isSelected=false;
  // }

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
      },{
        title:"MovementsProductManager",
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
