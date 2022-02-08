import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-warning-dialog-movements',
  templateUrl: './warning-dialog-movements.component.html',
  styleUrls: ['./warning-dialog-movements.component.scss']
})
export class WarningDialogMovementsComponent implements OnInit {

  @Input () description:string="";
  @Output () closeDialog = new EventEmitter();
  constructor() { }

  ngOnInit(): void { 
  }
  close(){
    this.closeDialog.emit();
  }

}
