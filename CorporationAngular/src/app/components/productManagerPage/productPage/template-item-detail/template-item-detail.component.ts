import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { Routers} from 'src/app/enums/routers/routers'
import { TemplateFilter } from 'src/app/interfaces/product/templateFilter';
import { maxCount, maxPrice } from '../products/products.component';

@Component({
  selector: 'app-template-item-detail',
  templateUrl: './template-item-detail.component.html',
  styleUrls: ['./template-item-detail.component.scss']
})
export class TemplateItemDetailComponent implements OnInit {

  routers = Routers;
  @Input() template : TemplateFilter = {
    id: 0,
    title: '',
    readonly:false,
    criteria: {
      regionId:0,
      factoryId:0,
      storageId:0,
      manufacturerId:0,
      categoryId:0,
      unitId:0,
      startCount:0,
      endCount:maxCount,
      startPrice:0,
      endPrice:maxPrice,
    }
  };


  @HostBinding('class')  
  hostClass="hidden"


  toOpen:boolean = false;
  isOpened:boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('click',['$event'])
  hostClick(event:Event){
    console.log('host click')
    event.stopPropagation();
  }

  @HostListener('window:click')
  hide(){
    if (this.toOpen) {      
      this.toOpen= false;
      return;
    }

    this.hostClass="hidden"
    this.isOpened = false;
  }

  toggle(){

    if (!this.isOpened) {
      this.toOpen = true;
      this.isOpened = true;
      this.hostClass = "";
    }
  }

  remove(){
    console.log("remove template");
  }

 

}
