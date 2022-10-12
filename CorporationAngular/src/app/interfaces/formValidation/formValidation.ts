export interface FormValidation{
    prevState:any,
    message:string ,
    duration:number | undefined
  }

  export interface FormValidator{
    prevState:string,
    isValid:boolean,
    message:string | undefined
  }