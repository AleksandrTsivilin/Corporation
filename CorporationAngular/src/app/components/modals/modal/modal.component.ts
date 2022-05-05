import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalInfo } from 'src/app/interfaces/modal';




export enum Positions{
  center,
  topCenter
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() modalInfo:ModalInfo={
    title:"",
    message:"",
    position:Positions.center
  }

  @Output()  answer = new EventEmitter<boolean>(false)

  

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
