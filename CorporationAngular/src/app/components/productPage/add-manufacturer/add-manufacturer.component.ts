import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Manufacturer } from 'src/app/interfaces/formAddProduct';
import { SignalrProductService } from 'src/app/services/productPage/signalr-product.service';

@Component({
  selector: 'app-add-manufacturer',
  templateUrl: './add-manufacturer.component.html',
  styleUrls: ['./add-manufacturer.component.scss']
})
export class AddManufacturerComponent implements OnInit {

  formManufacturer:Manufacturer={
    title:""
  }

  @Output() addManufacturer=new EventEmitter();
  constructor(private readonly signalrService:SignalrProductService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.formManufacturer);
    this.signalrService.addManufacturer(this.formManufacturer);
    this.addManufacturer.emit();

  } 

}
