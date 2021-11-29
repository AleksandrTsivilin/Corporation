export interface FormMoveProducts{
    to:string,
    movedProducts:MovedProduct[]
}

interface MovedProduct{
    id:number,
    title:string,
    avaiableCount:number,
    countMoved:number,
    isChecked:false,
}