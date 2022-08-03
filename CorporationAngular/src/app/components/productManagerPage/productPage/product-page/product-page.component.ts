import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Positions } from 'src/app/components/modals/modal/modal.component';
import { Routers } from 'src/app/enums/routers/routers';
import { ModalInfo } from 'src/app/interfaces/modal';
import { TabService } from 'src/app/services/tab.service';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  routers = Routers;
  isShowModal = false;
  isNewTab = false;
  modal : ModalInfo = {
    title: "Would you like to open new product tab",
    message: 'If you open new tab, data will be lost',
    position: Positions.center
  }
  constructor(
    private readonly router : Router,
    private readonly tabService: TabService
    ) {
      const start = history.state.start;
      if (start){
        this.isNewTab = true;
        this.isShowModal = true;
      }
    }


  ngOnInit(): void {
   }

  answerModal(answer : boolean){
    answer
      ? this.startSetting()
      : this.router.navigate(['/services']);
  }

  private startSetting(){
    this.isShowModal = false;
    if (this.isNewTab) {
        this.tabService.remove("products")
        this.router.navigate([this.routers.INSTRUCTION]);
    }
  }
}
