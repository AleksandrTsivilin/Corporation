import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Unit } from 'src/app/interfaces/formAddProduct';
import { SignalrProductService } from 'src/app/services/productPage/signalr-product.service';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.scss']
})
export class AddUnitComponent implements OnInit {

  formUnit:Unit={
    title:""
  }

  @Output() addUnit=new EventEmitter();
  constructor(private readonly signalrService:SignalrProductService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.signalrService.addUnit(this.formUnit);
    this.addUnit.emit();

  } 

}
