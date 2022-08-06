import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-close-btn',
  templateUrl: './close-btn.component.html',
  styleUrls: ['./close-btn.component.scss']
})
export class CloseBtnComponent implements OnInit {

  @Output() responce = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  click(){
    this.responce.emit();
  }

}
