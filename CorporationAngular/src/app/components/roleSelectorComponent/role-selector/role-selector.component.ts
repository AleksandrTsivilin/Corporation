import { Component, OnInit, Output } from '@angular/core';
import { DataUser } from 'src/app/interfaces/dataUser';

@Component({
  selector: 'app-role-selector',
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.scss']
})
export class RoleSelectorComponent implements OnInit {

  

  dataUser:DataUser={
    id:null,
    roles:null,
    permissions:null
  } 

  isSelected:boolean=false;
  modeSelector:string="";
  constructor() { }

  ngOnInit(): void {
    this.isSelected=false;
    this.dataUser=this.getDataUser();
    
  }

  onSelect(selected:string){
    console.log("onSelectedService");
    this.modeSelector=selected;
    this.isSelected=true;
  }

  exit(){
    this.isSelected=false;
  }

  //template methods

  getDataUser():DataUser{
    return {
      id:1,
      roles:["AdminManager","ProductManager"],
      permissions:["create","read","update","delete"]
    }
  }

}
