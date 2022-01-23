
import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';
import { AvaiablesPermissions } from 'src/app/interfaces/avaiablesPermissions';

import { UserInfo } from 'src/app/interfaces/userInfo';


@Component({
  selector: 'tr[app-user-item]',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input () userInfo:UserInfo={
    id:0,
    username:"",
    employee:{id:0,lastname:"",firstname:""},
    avaiables:[]
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
  }

  
  removeUser(){
    this.remove.emit();
  }

  editUser(){
    this.edit.emit();
  }

}
