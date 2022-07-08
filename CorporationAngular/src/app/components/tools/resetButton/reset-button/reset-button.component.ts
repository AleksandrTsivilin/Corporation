import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reset-button',
  templateUrl: './reset-button.component.html',
  styleUrls: ['./reset-button.component.scss']
})
export class ResetButtonComponent implements OnInit {


  @Output() reset = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  action(){
    this.reset.emit();
  }

}
