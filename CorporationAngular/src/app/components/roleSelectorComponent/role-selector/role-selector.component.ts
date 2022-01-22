import { Component, OnInit, Output } from '@angular/core';
import { TokenData } from 'src/app/interfaces/auth/tokenData';
import { AvaiablesPermissions } from 'src/app/interfaces/avaiablesPermissions';
import { PageState } from 'src/app/interfaces/pageState';
//import { DataUser } from 'src/app/interfaces/dataUser';
import { UserInfo } from 'src/app/interfaces/userInfo';
import { Permission } from 'src/app/interfaces/userInfo';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-role-selector',
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.scss']
})
export class RoleSelectorComponent implements OnInit {

  tokenData:TokenData={
    userId:0,
    fullname:"",
    avaiables:[]
  }

  pageState:PageState={
    path:"",
    isActive:true
  }

  openedTabs:string []=[];

  
  constructor(private readonly authService : AuthService) { }

  ngOnInit(): void {
    this.authService.tokenData$.subscribe(tokenData=>{
      if (tokenData !==null) {
        this.tokenData=tokenData;
      }
    })  
  }

  checkRole(title:string){ 
    
    return this.tokenData.avaiables.map(a=>a.Role)
      .includes(title);     
  }

  

  getAvaiablesPermissions(selectedRole:string):AvaiablesPermissions{
    // const permissionTitles=this.tokenData.roles
    //   .filter(role=>role.Title===selectedRole)
    //   .map(r=>r.Permissions)[0]
    //   .map(p=>p.Title);      
     
    // return {
    //   canCreate:permissionTitles.includes("Create"),
    //   canRead:permissionTitles.includes("Read") || 
    //     permissionTitles.includes("Update") ||
    //     permissionTitles.includes("Delete"),
    //   canUpdate:permissionTitles.includes("Update"),
    //   canDelete:permissionTitles.includes("Delete"),
    //   canMove:permissionTitles.includes("move")
    // }
    return {
      canCreate:true,
      canRead:true,
      canUpdate:true,
      canDelete:true,
      canMove:true
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
}
