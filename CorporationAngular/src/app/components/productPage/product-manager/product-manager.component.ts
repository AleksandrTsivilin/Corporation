import { Component, OnInit, Input } from '@angular/core';
import { AvaiablesPermissions } from 'src/app/interfaces/avaiablesPermissions';
import { Permission } from 'src/app/interfaces/userInfo';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {

  @Input () userId:number=0;
  //@Input () permissions:Permission[]=[];
  @Input () avaiablesPermissions:AvaiablesPermissions={
    canCreate:false,
    canRead:false,
    canUpdate:false,
    canDelete:false,
    canMove:false
  }
  isSelect:boolean=false;
  modeProductPage:string="";

  constructor() { }

  ngOnInit(): void {
    console.log(this.avaiablesPermissions);
  }

  // canGet():Boolean{
  //   return true;
  // }
  // canCreate():Boolean{
  //   return true;
  // }

  // canMove():Boolean{
  //   return true;
  // }

  onSelect(selected:string){

  }

}
