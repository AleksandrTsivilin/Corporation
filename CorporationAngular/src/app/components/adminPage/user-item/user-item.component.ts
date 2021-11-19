import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit, Output , EventEmitter } from '@angular/core';
import { UserInfo } from 'src/app/interfaces/userInfo';


@Component({
  selector: 'tr[app-user-item]',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input () userInfo:UserInfo={
    id:null,
    username:null,
    firstname:null,
    roles:null
  }

  @Input () numUser:number=0;

  @Output() remove =new EventEmitter();
  @Output() edit=new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  convertToString(array:string[] | null){
    if (array===null) return [];
    return array.join(", ");
  }
  removeUser(){
    this.remove.emit();
  }

  editUser(){
    this.edit.emit();
  }

}
