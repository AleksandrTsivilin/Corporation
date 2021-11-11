import { Component, Input, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/interfaces/userInfo';

@Component({
  selector: 'tr[app-user-item]',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input () userInfo:UserInfo={
    username:null,
    firstname:null,
    roles:null
  }

  @Input () numUser:number=0;

  constructor() { }

  ngOnInit(): void {
  }

  convertToString(array:string[] | null){
    if (array===null) return [];
    return array.join(", ");
  }
  

}
