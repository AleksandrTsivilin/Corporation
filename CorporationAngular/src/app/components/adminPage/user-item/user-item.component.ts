import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';
import { HeaderTable } from 'src/app/interfaces/header-table';
import { UserInfo } from 'src/app/interfaces/userInfo';
import { Role} from 'src/app/interfaces/userInfo';

@Component({
  selector: 'tr[app-user-item]',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input () userInfo:UserInfo={
    id:0,
    username:"",
    firstname:"",
    roles:[]
  }

  @Input () numUser:number=0;
  @Input () headers:HeaderTable[]=[];

  @Output() remove =new EventEmitter();
  @Output() edit=new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // convertToString(array:string[] | null){
  //   if (array===null) return [];
  //   return array.join(", ");
  // }
  removeUser(){
    this.remove.emit();
  }

  editUser(){
    this.edit.emit();
  }

  canEdit():Boolean{
    return this.headers.map(_=>_.title).includes("edit");     
  }

  canDelete():Boolean{
    return this.headers.map(_=>_.title).includes("delete"); 
  }

}
