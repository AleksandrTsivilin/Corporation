import { Component, OnInit , Input} from '@angular/core';
import { DataUser } from 'src/app/interfaces/dataUser';


@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin-manager.component.html',
  styleUrls: ['./admin-manager.component.scss']
})
export class AdminManagerComponent implements OnInit {

  @Input () dataUser:DataUser={
    id:null,
    roles:null,
    permissions:null
  };
  
  modeAdminPage:string="";
  isSelect:boolean=false;
  constructor() { }

  ngOnInit(): void {    
    
  }

  canCreate():boolean | undefined{       
    return this.dataUser?.permissions?.includes("create");
  }

  canGet():boolean | undefined{
    return this.dataUser?.permissions?.includes("read") || 
      this.dataUser?.permissions?.includes("update") || 
      this.dataUser?.permissions?.includes("delete");
  }

  onSelect(selected:string){
    this.modeAdminPage=selected;
    this.isSelect=true;
  }
}
