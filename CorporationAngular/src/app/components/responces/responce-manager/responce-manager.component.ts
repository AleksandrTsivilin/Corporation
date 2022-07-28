import { Component, Input, OnInit } from '@angular/core';

export enum StatusCodes {
  "_404",
  "_500"
}

interface Responce{
  code : StatusCodes,
  image : string
}

@Component({
  selector: 'app-responce-manager',
  templateUrl: './responce-manager.component.html',
  styleUrls: ['./responce-manager.component.scss']
})
export class ResponceManagerComponent implements OnInit {

  @Input() code:number = 0; 
  

  private readonly responces : Responce [] = [
    {code:StatusCodes._500, image:"assets/images/responce 500.png"},
    {code:StatusCodes._404, image:"../assets/images/responces/responce404.jpg"}
  ];

  currentResponce = this.responces[0];

  constructor() { }

  ngOnInit(): void {
    this.currentResponce = this.get();
    console.log(this.currentResponce);
  }

  get() : Responce{
    return this.responces
    .filter(responce=>responce.code === this.code)[0];
  }


}
