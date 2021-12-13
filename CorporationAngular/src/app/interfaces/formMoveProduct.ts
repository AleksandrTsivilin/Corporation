export interface FormMoveProducts{
    to:string,
    movedProducts:MovedProduct[]
}
 
export interface MovedProduct{
    id:number,
    title:string,
    avaiableCount:number,
    countMoved:number,
    isChecked:false,
    price:number,
    unit:string
}