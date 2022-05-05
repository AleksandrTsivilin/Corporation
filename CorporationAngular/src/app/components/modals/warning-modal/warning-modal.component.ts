import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalInfo } from 'src/app/interfaces/modal';
import { Positions } from '../modal/modal.component';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss']
})
export class WarningModalComponent implements OnInit {


  @Input() modalInfo:ModalInfo={
    title:"nnnnnnnnnnn",
    message:"kkkkkkkkkkkkkkkkkkk",
    position:Positions.center
  }

  @Output() answer = new EventEmitter<boolean>(false)

  ModalPositions = ['modal-center', 'modal-top-center'];

  constructor() { }

  ngOnInit(): void {
  }

  negativeAnswer(){
    this.answer.emit(false)
  }

  positiveAnswer(){
    this.answer.emit(true)
  }

}
