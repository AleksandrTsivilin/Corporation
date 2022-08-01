import { Component, Input, OnInit } from '@angular/core';


interface Responce{
  code : number,
  image : string
}

@Component({
  selector: 'app-responce-manager',
  templateUrl: './responce-manager.component.html',
  styleUrls: ['./responce-manager.component.scss']
})
export class ResponceManagerComponent implements OnInit {

  @Input() code:number = 0; 
  
  private readonly defaultResponce:Responce ={
    code:500, image:"assets/images/responces/responce500.png"
  }
  private readonly responces : Responce [] = [
    {code:400, image:"../assets/images/responces/responce400.jpg"},
    {code:403, image:"../assets/images/responces/responce403.jpg"},
    {code:404, image:"../assets/images/responces/responce404.jpg"}
  ];

  currentResponce = this.responces[0];

  constructor() { 
    this.code = history.state.code;
  }

  ngOnInit(): void {
    console.log('responce on init')
    
    this.currentResponce = this.get();
  }

  get() : Responce{
    console.log(this.code)
    const responce = this.responces
      .filter(responce=>responce.code === this.code)[0];
    console.log(responce)
    return responce
      ? responce
      : this.defaultResponce;
    
  }


}
