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
    employee:{id:0,lastname:"",firstname:""},
    avaiables:[],
    fullname:null,
    department:{id:0,title:""}
  }
  @Output() close=new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeUserInfo(){
    console.log(this.userInfo.avaiables)
    this.close.emit();
  }

}
