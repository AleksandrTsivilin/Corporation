import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormValidationMessage } from '../enums/formValidationMessage/formValidationMessage';
import { FormValidation } from '../interfaces/formValidation/formValidation';



@Directive({
  selector: '[numbersOnly]'
})
export class NumberOnlyDirective {

  formsMessage = FormValidationMessage;

  
  @Input() numbersOnly_maxLength!:string;
  @Input() numbersOnly_duration:number = 500;
 

  @Output('numbersOnly_valid')
  hasError = new EventEmitter<FormValidation>()

 

  @HostListener('input',['$event'])
  onInputChange(event:any){

      
      let inputValue =  String(this._el.nativeElement.value);
      
      inputValue =  this.startSet(inputValue);
      if (inputValue.length>1 && this.isStartWith(inputValue,"0"))
        inputValue = inputValue.substring(1);

      

      let inputOnlyNum =  this.getByRegExp(inputValue);

      const isEmptyInput = this.isEmpty(inputValue);
      const isEmptyInputOnlyNum = this.isEmpty(inputOnlyNum);

      if (isEmptyInput || isEmptyInputOnlyNum) {
        inputOnlyNum = this.setDefault();
        this.createBadResponce(inputOnlyNum,this.formsMessage.REQUARIED)
      }
      
      const isValidLength = this.isValidLength(inputOnlyNum);

      if (!isValidLength) {
        const prev = inputOnlyNum.substring(0,Number(this.numbersOnly_maxLength));
        const message = this.formsMessage.MAX_LENGTH;
        this._el.nativeElement.value=prev;
        this.createBadResponce(prev,message,this.numbersOnly_duration);       
        event.stopPropagation(); 
        return;
      }

      this._el.nativeElement.value = inputOnlyNum;
      
      const isNotEquel = this.compare(this._el.nativeElement.value, inputValue);

    
      
      if (isNotEquel){
          const message =isNotEquel + " " + this.formsMessage.INCORRECT_CHARACTER;
          this.createBadResponce(inputOnlyNum, message,this.numbersOnly_duration)
          event.stopPropagation();
      }


      
  }  


  constructor(private readonly _el: ElementRef) {}

  private getByRegExp(items : string): string{
    return items.replace(/[^0-9]*/g, '');
  }

  private isEmpty(items : string):boolean{
    return items.length === 0;
  }

  private setDefault():string{
    return "0";
  }

  private isStartWith(item : string,check:string) : boolean{
    return item[0] == check;
  }

  private compare(onlyNum:string, source:string) : string | null{

    return onlyNum == source
      ? null
      : source.replace(onlyNum,"");
  }

  private createBadResponce(input : string , message : string, duration?:number){
    this.hasError.emit({
      prevState:Number(input),
      message:message,
      duration:duration
    });
  }

  private isValidLength(item:string): boolean {
    return item.length < Number(this.numbersOnly_maxLength);
  }

  private startSet(input : string) : string{
    if (input.length>1 && this.isStartWith(input,"0"))
        input = input.substring(1);
    return input;
  }

}
