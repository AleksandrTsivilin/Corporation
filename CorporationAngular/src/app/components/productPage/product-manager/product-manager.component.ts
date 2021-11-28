import { Component, OnInit, Input } from '@angular/core';
import { Permission } from 'src/app/interfaces/userInfo';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {

  @Input () userId:number=0;
  @Input () permissions:Permission[]=[];

  isSelect:boolean=false;
  modeProductPage:string="";

  constructor() { }

  ngOnInit(): void {
    console.log(this.permissions);
  }

  canGet():Boolean{
    return true;
  }
  canCreate():Boolean{
    return true;
  }

  canMove():Boolean{
    return true;
  }

  onSelect(selected:string){

  }

}
