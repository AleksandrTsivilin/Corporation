import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Output } from '@angular/core';

import { AvaiableUser } from 'src/app/interfaces/auth/avaiablesUserForm';
import { TokenData } from 'src/app/interfaces/auth/tokenData';
import { AvaiablesPermissions } from 'src/app/interfaces/avaiablesPermissions';
import { PageState } from 'src/app/interfaces/pageState';
import { StateCard } from 'src/app/interfaces/roleselector/stateCards';
import { Tab } from 'src/app/interfaces/roleselector/tab';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-role-selector',
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.scss']
})
export class RoleSelectorComponent implements OnInit {

  tokenData:TokenData={
    userId:0,
    username:"",
    avaiables:[],
    department:0,
    factory:0,
    region:0
  }
  avaiables : AvaiableUser={
    role: {id:0,title:""},
    access: {id:0,title:""},
    permissions:[]
  }
  pageState:PageState={
    path:"",
    isActive:true
  }
  stateCards:StateCard []=[];

  //openedTabs:string []=[];
  openedTabs:Tab[]=[];
  isFrontSideCard:boolean = true;
  
  constructor(private readonly authService : AuthService) { }

  ngOnInit(): void {
    this.authService.tokenData$.subscribe(tokenData=>{
      if (tokenData !==null) {
        this.tokenData=tokenData;
      }
    }) 
    this.stateCards=this.setStateCards(); 
  }

  checkRole(title:string){ 
    return this.tokenData.avaiables.map(a=>a.role.title).includes(title);
  }

  

  getAvaiablesPermissions(selectedRole:string):AvaiablesPermissions{
    const permissionsByRole = this.tokenData.avaiables
      .filter(avaiable=>avaiable.role.title === selectedRole)
      .map(avaiable=>avaiable.permissions)[0]
      .map(permission=>permission.title);
    
    return {
      canCreate:permissionsByRole.includes("Create"),
      canRead:permissionsByRole.includes("Read") || 
        permissionsByRole.includes("Update") ||
        permissionsByRole.includes("Delete"),
      canUpdate:permissionsByRole.includes("Update"),
      canDelete:permissionsByRole.includes("Delete"),
      canMove:permissionsByRole.includes("move")
    }
  }
  getStateCard(key:string){
    return this.stateCards
      .filter(card=>card.key===key)[0].isFrontSide;
  }
  changeModePage(path:string){
    this.pageState={
      path:path,
      isActive:false
    }
    if (!this.openedTabs.map(tab=>tab.title).includes(path)){
      this.openedTabs.map(tab=>tab.isActive=false);
      this.openedTabs.push({title:path,isActive:true});
    }        
  }


  returnToSelector(){
    this.pageState={
      path:"",
      isActive:true
    }
  }
  moveToTab(selectedTab:Tab){
    this.openedTabs.map(tab=>{
      tab.title===selectedTab.title 
        ? tab.isActive=true
        : tab.isActive =false;
    })
    this.pageState={
      path:selectedTab.title,
      isActive:false
    }
  }
  closeTab(title:string){
    console.log(this.openedTabs)
    const indexTab=this.openedTabs.map(tab=>tab.title).indexOf(title);
    this.openedTabs=this.openedTabs.filter(tab=>tab.title!==title);
    if (this.openedTabs.length===0) 
    {
      this.returnToSelector();
      return;
    }
    
    indexTab === this.openedTabs.length
      ?this.moveToTab(this.openedTabs[(this.openedTabs.length-1)])
      :this.moveToTab(this.openedTabs[indexTab]); 
  }

  returnCard(key:string){
    this.stateCards = this.stateCards.map(card=>{
      if (card.key!==key) return card;
      return {key:card.key,isFrontSide:!card.isFrontSide}
    });
    
    //this.isFrontSideCard = !this.isFrontSideCard;
  }

  private setStateCards() : StateCard[]{
    return [
      {
        key:"personal_data",
        isFrontSide:true
      },
      {
        key:"users",
        isFrontSide:true
      },
      {
        key:"addUser",
        isFrontSide:true
      },
      {
        key:"products",
        isFrontSide:true
      },
      {
        key:"addProduct",
        isFrontSide:true
      },
      {
        key:"addMovementProduct",
        isFrontSide:true
      }
    ]
  }
}
