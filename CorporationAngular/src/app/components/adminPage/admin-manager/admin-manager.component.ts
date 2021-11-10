import { Component, OnInit , Input} from '@angular/core';
import { DataUser } from 'src/app/interfaces/dataUser';
import { AdminManagerService } from 'src/app/services/adminPage/admin-manager.service';

@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin-manager.component.html',
  styleUrls: ['./admin-manager.component.scss']
})
export class AdminManagerComponent implements OnInit {

  //@Input () userId:number | null=null;
  @Input () dataUser:DataUser={
    id:null,
    roles:null,
    permissions:null
  };
  //permissions:string[]=[];
  modeAdminPage:string="";
  isSelect:boolean=false;
  constructor(private readonly adminService:AdminManagerService) { }

  ngOnInit(): void {    
    //console.log(this.userId);
    
    // if (this.userId !== null) {
    //   this.adminService.getPermissions(this.userId)
    //     .subscribe((result)=>{
    //       this.permissions=result;
    //     },
    //     ()=>{console.log("request failed getPermissions")}
    //     )
    // }
  }

  canCreate():boolean | undefined{    
    //return this.permissions.includes("create");
    console.log("canCreate adminManager");
    console.log(this.dataUser);
    return this.dataUser?.permissions?.includes("create");
  }

  canGet():boolean | undefined{
    return this.dataUser?.permissions?.includes("read") || 
      this.dataUser?.permissions?.includes("update") || 
      this.dataUser?.permissions?.includes("delete");

    // return this.permissions.includes("read") || 
    //   this.permissions.includes("update") || 
    //   this.permissions.includes("delete");
  }

  onSelect(selected:string){
    this.modeAdminPage=selected;
    this.isSelect=true;
  }
}
