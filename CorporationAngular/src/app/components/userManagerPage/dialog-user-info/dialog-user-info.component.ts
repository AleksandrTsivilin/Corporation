import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { UserInfo } from 'src/app/interfaces/userInfo';



@Component({
  selector: 'app-dialog-user-info',
  templateUrl: './dialog-user-info.component.html',
  styleUrls: ['./dialog-user-info.component.scss']
})
export class DialogUserInfoComponent implements OnInit {

  @Input () userInfo:UserInfo={
    id:0,
    username:"",
    firstname:"",
    roles:[]
  }
  @Output() close=new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeUserInfo(){
    this.close.emit();
  }

}
