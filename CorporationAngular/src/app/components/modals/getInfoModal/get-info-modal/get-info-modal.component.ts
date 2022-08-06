import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetDataModal, ModalInfo, ResponceGetDataModal } from 'src/app/interfaces/modal';
import { Positions } from '../../modal/modal.component';

@Component({
  selector: 'app-get-info-modal',
  templateUrl: './get-info-modal.component.html',
  styleUrls: ['./get-info-modal.component.scss']
})
export class GetInfoModalComponent implements OnInit {

  @Input() modalInfo:GetDataModal={
    title:"",
    position:Positions.center
  }

  @Output() answer = new EventEmitter<ResponceGetDataModal>(false)

  title:string = "";

  ModalPositions = ['modal-center', 'modal-top-center'];

  constructor() { }

  ngOnInit(): void {
  }

  negativeAnswer(){
    this.answer.emit({
      answer:false,
      data:""
    })
  }

  positiveAnswer(){
    this.answer.emit({
      answer:true,
      data:this.title
    })
  }

}
