import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin-manager.component.html',
  styleUrls: ['./admin-manager.component.scss']
})
export class AdminManagerComponent implements OnInit {

  @Input () userId:number | null=null;
  permissions:string[]=[];
  modeAdminPage:string="";
  isSelect:boolean=false;
  constructor() { }

  ngOnInit(): void {
    console.log(this.userId)
    if (this.userId !== null) {
       this.permissions=this.getPermissions(this.userId);
    }
  }

  canCreate():boolean{
    return this.permissions.includes("create");
  }

  canGet():boolean{
    return this.permissions.includes("read") || 
      this.permissions.includes("update") || 
      this.permissions.includes("delete");
  }

  onSelect(selected:string){
    this.modeAdminPage=selected;
    this.isSelect=true;
  }

  //template methods
  getPermissions(userId:number):string[]{
    return ["create","read","update","delete"]
  }

}
