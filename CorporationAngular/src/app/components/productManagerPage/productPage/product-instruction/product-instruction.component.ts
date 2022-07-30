import { Component, OnInit } from '@angular/core';
import { Routers } from 'src/app/enums/routers/routers';

@Component({
  selector: 'app-product-instruction',
  templateUrl: './product-instruction.component.html',
  styleUrls: ['./product-instruction.component.scss']
})
export class ProductInstructionComponent implements OnInit {

  routers = Routers;

  constructor() { }

  ngOnInit(): void {
  }

}
