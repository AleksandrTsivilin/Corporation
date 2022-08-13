import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Positions } from 'src/app/components/modals/modal/modal.component';
import { ProductTitlePage } from 'src/app/enums/productPage/productTitlePage';
import { Routers } from 'src/app/enums/routers/routers';
import { ModalInfo } from 'src/app/interfaces/modal';
import { TabService } from 'src/app/services/tab.service';

@Component({
  selector: 'app-product-instruction',
  templateUrl: './product-instruction.component.html',
  styleUrls: ['./product-instruction.component.scss']
})
export class ProductInstructionComponent implements OnInit {

  routers = Routers;

  isShowModal:boolean = true;

  modal:ModalInfo={
    title: "Information message",
    message: "Would you like to read an instruction before using product service?",
    position: Positions.center
  }

  instruction:string = "";

  constructor(
    private readonly router: Router,
    private readonly tabService:TabService
    ) { }

  ngOnInit(): void {

  }

  answerModal(answer : boolean){

    answer 
      ? this.startSetting()
      : this.router.navigate([this.routers.TEMPLATES]);
    
  }

  private startSetting(){
    this.isShowModal = false;
    this.createTab();
    this.getData();

  }

  private getData(){
    this.instruction = 
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor neque, quae, quidem at fugiat blanditiis asperiores alias veniam odit aliquid, eum ut in vel explicabo ad. Facilis harum accusantium sed. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea hic sequi commodi labore dolores recusandae voluptatibus, debitis assumenda natus, obcaecati quaerat consequatur repellat qui molestias nulla magnam facilis. Voluptatem, dolores!"
    
    
  } 

  private createTab(){
    this.tabService.addedTab({
      title : ProductTitlePage.INSTRUCTION,
      router : this.routers.INSTRUCTION,
      additional : "",
      key : ""
    })
  }

}
