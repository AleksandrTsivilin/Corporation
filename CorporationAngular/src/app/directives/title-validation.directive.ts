
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormValidationMessage } from '../enums/formValidationMessage/formValidationMessage';
import { FormValidation } from '../interfaces/formValidation/formValidation';


@Directive({
  selector: '[titleValidation]'
})
export class TitleValidationDirective {

  private formsMessage = FormValidationMessage;

  @Input() maxLength:number = 10;
  @Input() minLenght:number = 3;
  @Input() duration:number = 500;
  @Input() regExp = /[!@#№$%^&*()+?/.,;:"]*/g;

  @Output('titleValidation_valid')
  responce = new EventEmitter<FormValidation>()

  

  @HostListener('input',['$event'])
  onInputChange(event:any){
    
    const inputValue = this._el.nativeElement.value;  

    const isEmpty = this.isEmpty(inputValue);

    if (isEmpty){
      event.stopPropagation();
      return;
    }

    const validStr = this.getByRegExp(inputValue);

    const isValidByRegExp = this.isValidByRegExp(inputValue, validStr);
    
    if (!isValidByRegExp) {
      event.stopPropagation();
      return;
    }
    

    const isShort = this.isShort(validStr);

    if (isShort){
      event.stopPropagation;
      return;
    }

    const isLong = this.isLong(validStr);

    if (isLong){
      event.stopPropagation();
      return;
    }

    this.responceBuilder(validStr);
  }
  
  constructor(private readonly _el:ElementRef) { }


  private getByRegExp(str : string) : string {
    return str.replace(this.regExp,"");
  }

  private isEmpty(input : string) : boolean {
    if (input.length > 0) return false;
    this.responceBuilder(input,this.formsMessage.REQUARIED);
    return true;
  }

  private isValidByRegExp(rawStr:string, validStr:string) : boolean {
    const difference = this.compare(rawStr, validStr);
    if (!difference) return true;
    const message = this.formsMessage.INCORRECT_CHARACTER + " " + difference;
    this._el.nativeElement.value = validStr;
    this.responceBuilder(validStr,message,this.duration);
    return false;
  }

  private compare(source:string, clearStr : string) : string | null{
    return source == clearStr ? null : source.replace(clearStr,"");
  }

  private isShort(input : string) :boolean {
    const length = input.length;
    if (length>=this.minLenght) return false;
    const message = this.formsMessage.SHORT_TITLE;
    this.responceBuilder(input, message)
    return true;
  }

  private isLong(input : string) : boolean {
    const lenght = input.length;
    if (lenght<=this.maxLength) return false;

    const message = this.formsMessage.MAX_LENGTH;
    const last = input.length-1;
    this._el.nativeElement.value = input.substring(0,last);

    this.responceBuilder(this._el.nativeElement.value, message, this.duration);
    return true;
  }

  private responceBuilder(body : string, errorMessage="", duration?:number){
    this.responce.emit({
      prevState:body,
      message:errorMessage,
      duration:duration
    })
  }
}
