import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UnitInfo } from 'src/app/interfaces/product/unitManagerPage/unitInfo';
//import { Unit } from 'src/app/interfaces/formAddProduct';
//import { SignalrProductService } from 'src/app/services/productPage/signalr-product.service';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.scss']
})
export class AddUnitComponent implements OnInit {

  formUnit:UnitInfo={
    id:0,
    title:""
  }

  @Output() addUnit=new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    //this.signalrService.addUnit(this.formUnit);
    this.addUnit.emit();

  } 

}
