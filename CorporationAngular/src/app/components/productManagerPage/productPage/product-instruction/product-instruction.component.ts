import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Positions } from 'src/app/components/modals/modal/modal.component';
import { Routers } from 'src/app/enums/routers/routers';
import { ModalInfo } from 'src/app/interfaces/modal';

@Component({
  selector: 'app-product-instruction',
  templateUrl: './product-instruction.component.html',
  styleUrls: ['./product-instruction.component.scss']
})
export class ProductInstructionComponent implements OnInit {

  routers = Routers;
  isShowModal:boolean = true;
  modal:ModalInfo={
    title: "Information message",
    message: "Would you like to read an instruction before using product service?",
    position: Positions.center
  }
  constructor(private readonly router: Router) { }

  ngOnInit(): void {

  }

  answerModal(answer : boolean){
    if (answer) this.isShowModal = false;
    else this.router.navigate([this.routers.TEMPLATES],{state:{modal:true}});
  }

}
