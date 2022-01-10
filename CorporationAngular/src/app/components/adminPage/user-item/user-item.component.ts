import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';
import { AvaiablesPermissions } from 'src/app/interfaces/avaiablesPermissions';
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
  @Input () avaiablePermissions : AvaiablesPermissions={
    canCreate:false,
    canRead:false,
    canUpdate:false,
    canDelete:false,
    canMove:false
  }
  

  @Output() remove =new EventEmitter();
  @Output() edit=new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.avaiablePermissions)
  }

  
  removeUser(){
    this.remove.emit();
  }

  editUser(){
    this.edit.emit();
  }

}
