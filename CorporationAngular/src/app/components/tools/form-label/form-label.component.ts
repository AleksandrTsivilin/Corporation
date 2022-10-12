import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormValidationMessage } from 'src/app/enums/formValidationMessage/formValidationMessage';

@Component({
  selector: 'app-form-label',
  templateUrl: './form-label.component.html',
  styleUrls: ['./form-label.component.scss']
})
export class FormLabelComponent implements OnInit {

  @Input() title:string ="";
  @Input() isValidState:boolean= true;
  @Input() errorMessage:string | undefined;
 
  formsMessage = FormValidationMessage;

  constructor() {}
  
  

  ngOnInit(): void {}

}
