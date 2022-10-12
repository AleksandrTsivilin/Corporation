
import { Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormValidationMessage } from '../enums/formValidationMessage/formValidationMessage';
import { FormValidator } from '../interfaces/formValidation/formValidation';


interface SeparatorInfo{
  position:number,
  sign:string
}

@Directive({
  selector: '[inputValidator]'
})
export class FormValidatorDirective implements OnChanges {

  @Input() maxLength:number = 10;
  @Input() minLength:number = 0;
  @Input() regExp:string | undefined;
  @Input() regExpStart:string | undefined ;
  @Input() regExpEnd:string | undefined ; 
  @Input() regExpDouble:string | undefined;
  @Input() maxLengthDouble:number = 1;
  @Input() duration:number = 500;

  

  @Output('responce') 
  responce = new EventEmitter<FormValidator>();

  private formsMessage = FormValidationMessage;

  private prevState : FormValidator ={
    prevState:"",
    isValid: true,
    message: undefined
  }
  private excecuting : boolean = false;
  
  private mainPart:string = "";
  private separator: SeparatorInfo | undefined;
  private doublePart: string | undefined;

  @HostListener('blur',['$event'])
  onTouched(event:any){
    const inputValue = this._el.nativeElement.value;     

    const clearValue = this.removeDirtyCharacters(inputValue);

    const isEmpty =  this.isEmpty(clearValue);
    if (isEmpty){
      event.stopPropagation();
      return;
    }

    const isShort = this.isShort(clearValue); 
    if (isShort){
      event.stopPropagation();
      return;
    }

    
    event.stopPropagation();    
  }  

  
  @HostListener('input',['$event'])
  onInputChange(event:any){

    let inputValue = this._el.nativeElement.value;

    const isEmpty  = this.isEmpty(inputValue);    
    if (isEmpty) {
      event.stopPropagation();
      return;
    }
    
    const isValidStart = this.isValidStart(inputValue);
    if (!isValidStart){
      event.stopPropagation();
      return;
    }

    if (this.regExpDouble) 
      this.separator = this.tryGetSeparator(inputValue);      
    
    const checkValue = this.getCheckValue(inputValue);
    if (checkValue == ""){
      event.stopPropagation();
      this.resultBuilder();
      return;
    }  

    const patterned = this.tryGetBodyByPattern(checkValue);
    if (!patterned) {      
      event.stopPropagation();
      return;
    }
       

    const isShort = this.isShort(patterned);

    if (isShort){
      event.stopPropagation();
      return;
    }

    const isLong = this.isLong(patterned);

    if (isLong){
      event.stopPropagation();
      return;
    }

    
    
    
    this._el.nativeElement.value = this.resultBuilder(); //patterned;
    this.replyBuilder();
    event.stopPropagation();
    
    
  }

  constructor(private readonly _el:ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.regExpEnd)
      this.regExpEnd = this.regExpDouble;
  }

  private getByPattern(str:string, regStr:string) : string{
    const reg = new RegExp(regStr,"g");
    return str.replace(reg,"");
  }

  private isEmpty(input : string) : boolean {
    if (input.length > 0) return false;
    this.replyBuilder(this.formsMessage.REQUARIED)
    return true;
  }

  private isValidStart(input : string) : boolean {
    if (!this.regExpStart) return true;

    const first = input[0];
    const difference = this.checkByPattern(first,this.regExpStart);
    if (!difference) return true;
    const message  = this.formsMessage.BAD_START + " " + difference;
    this.replyBuilder(message,this.duration);
    this._el.nativeElement.value = this.reset();
    return false;
    
  }

  private removeDirtyCharacters(input:string) : string{
    let isValidEnd = false;
    while(!isValidEnd){
      isValidEnd = this.isValidEnd(input);
      input = this._el.nativeElement.value
    }
    return input;
  }

  private isValidEnd(input:string) : boolean {
    if (!this.regExpEnd) return true;

    const last = input.slice(-1);
    const difference = this.checkByPattern(last, this.regExpEnd);
    if (!difference) return true;
    
    this._el.nativeElement.value =  this.removeEnd(input);
    return false; 
  }

  private tryGetSeparator(input: string) : SeparatorInfo | undefined {

    if (!this.regExpDouble) return;
    const matches = input.match(this.regExpDouble);
    if (!matches) return; 
   
    const index = input.indexOf(matches[0]);
    const sign = input[index];

    return (index && sign)  ? {position:index, sign:sign} : undefined;
  }
  
  private getCheckValue(input : string) : string{
    if (this.separator){
      const index = this.separator.position;
      this.mainPart = input.substring(0,index);
      this.doublePart = input.substring(index+1);
      return  this.doublePart;
    }
    else{ 
      this.mainPart = input;
      return input;
    }
  }

  private tryGetBodyByPattern(input:string):string | null{
    if (!this.regExp) return input;
    const difference = this.checkByPattern(input,this.regExp);
    if (!difference) return input;
    const rawResult = this.resultBuilder();
    this._el.nativeElement.value = this.removeEnd(rawResult);
    const message = this.formsMessage.INCORRECT_CHARACTER + " " + difference;
    this.replyBuilder(message,this.duration);

    return null;
  }

  private checkByPattern(source : string , regExp : string) : string | null{
    const patterned = this.getByPattern(source,regExp);
    const difference = this.compare(source,patterned);
    return difference == " " ? "space" : difference;
  }
 

  private isShort(input : string) :boolean {
    const length = input.length;
    if (length>=this.minLength) return false;
    const message = this.formsMessage.SHORT_TITLE;
    this.replyBuilder(message)
    return true;
  }

  private isLong(input : string ) : boolean {
    const lenght = input.length;

    const maxLength  = this.separator 
      ? this.maxLengthDouble 
      : this.maxLength;

    if (lenght<=maxLength) return false;
    const rawResult = this.resultBuilder();
    this._el.nativeElement.value = this.removeEnd(rawResult);

    const message = this.separator ? this.formsMessage.MAX_LENGTH_DOUBLE :  this.formsMessage.MAX_LENGTH;
    this.replyBuilder(message,this.duration);
    return true;
  }

  private compare (first: string, second:string) : string | null{
    return first == second ? null : first.replace(second,"");
  }

  private replyBuilder(errorMessage?:string, duration?:number){
    if (!errorMessage) {
      const responce = this.responceBuilder(true);
      this.responce.emit(responce);
      this.prevState = responce;
      return;
    }    
    
    duration 
      ? this.replyBuilderWithDelay(errorMessage,duration) 
      : this.replyBuilderWithoutDelay(errorMessage);
  }

  private replyBuilderWithDelay(message:string,duration:number){
      if (this.excecuting) return;
      const responce = this.responceBuilder(false,message);
      this.responce.emit(responce);
      this.excecuting = true;
      setTimeout(()=>{
        
        this.responce.emit(this.prevState)

        this.excecuting = false;
      },duration)
  }

  private replyBuilderWithoutDelay(errorMessage:string){
    const responce = this.responceBuilder(false,errorMessage);
    this.responce.emit(responce);
    this.prevState = responce;
  }

  private responceBuilder(isValid:boolean, message?:string) : FormValidator {
    return {
      prevState:this._el.nativeElement.value,
      message:message,
      isValid:isValid
    }
  }

  private removeEnd(source:string) : string{
    const last = source.length - 1;
    return  source.substring(0,last);
  }

  private resultBuilder() : string {
    let result = this.mainPart;
    if (this.separator?.sign) result += this.separator.sign;
    if (this.doublePart) result +=this.doublePart;
    return result;
  }

  private reset() : string {
    return "";
  }
}
