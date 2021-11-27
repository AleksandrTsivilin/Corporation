import { Component, OnInit , Input} from '@angular/core';
//import { DataUser } from 'src/app/interfaces/dataUser';
import { UserInfo } from 'src/app/interfaces/userInfo';
import { Permission } from 'src/app/interfaces/userInfo';

@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin-manager.component.html',
  styleUrls: ['./admin-manager.component.scss']
})
export class AdminManagerComponent implements OnInit {

  // @Input () dataUser:DataUser={
  //   id:null,
  //   roles:null,
  //   permissions:null
  // };

  @Input () userId:number=0;
  @Input () permissions:Permission[]=[];
  // @Input () user:UserInfo={
  //   id:0,
  //   username:"",
  //   firstname:"",
  //   roles:[]
  // }
  
  modeAdminPage:string="";
  isSelect:boolean=false;
  constructor() { }

  ngOnInit(): void {    
    
  }

  canCreate():boolean {       
    return this.permissions
      .map(permission=>permission.title)
      .includes("create");
    //const permissions=this.user.roles
    //return this.user.ro
  }

  canGet():boolean {
    const titiles= this.permissions
      .map(permission=>permission.title);

      return titiles.includes("read") ||
        titiles.includes("update") || 
        titiles.includes("delete");
      
  }

  onSelect(selected:string){
    this.modeAdminPage=selected;
    this.isSelect=true;
  }
}
