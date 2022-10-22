import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ProductTitlePage } from 'src/app/enums/productPage/productTitlePage';
import { TypeOperation } from 'src/app/enums/typeOperation';
import { NewTemplateFilter } from 'src/app/interfaces/product/newTemplateFilter';
import { ResponceInfo } from 'src/app/interfaces/responceInfo/responceInfo';
import { NotificationService } from '../../notification.service';
import { ProductTemplateSignalrService } from '../signalrServices/product-template-signalr.service';





@Injectable({
  providedIn: 'root'
})


export class UpdateProductTemplateService {
  

  TemplateChanges$ = new Subject<ResponceInfo>();

  constructor(
    private readonly signalr:ProductTemplateSignalrService,
    private readonly notify:NotificationService
    ) { 
      
    if (!this.signalr.hubConnection?.state){
  
      this.signalr.startConnection();
    }

    this.changesLis();
  }

  delete(id : number){
    this.signalr.hubConnection?.invoke("Delete",id);
  }

  // create new template
  add(filter: NewTemplateFilter) {
   const newFilter = this.convertForm(filter);
   this.signalr.hubConnection?.invoke("Add", newFilter)
  }

  // change existing template
  update(filter: NewTemplateFilter, id: number){
    const updatedFilter = this.convertForm(filter);
    this.signalr.hubConnection?.invoke("Update",id,updatedFilter);
  }

  // add user to existing template
  addUser(templId:number){
    this.signalr.hubConnection?.invoke("AddUser",templId);
  }

  private changesLis(){
    this.signalr.hubConnection?.on("changed", (response  : ResponceInfo) =>{
    
      if (!response.data) {
        this.notify.error(response.message,ProductTitlePage.TEMPLATES);
        return;
      }
      
      // if (response.type == TypeOperation.CREATE){
      //   this.notify.success(response.message, ProductTitlePage.TEMPLATES);
      //   return;
      // }

      this.TemplateChanges$.next(response);
    })
  }

  private convertForm(filter : NewTemplateFilter) : NewTemplateFilter{
    return {
      title:filter.title,
      regionId:Number(filter.regionId),
      factoryId:Number(filter.factoryId),
      storageId:Number(filter.storageId),
      manufacturerId:Number(filter.manufacturerId),
      categoryId:Number(filter.categoryId),
      unitId:Number(filter.unitId),
      startCount:Number(filter.startCount),
      endCount:Number(filter.endCount),
      startPrice:Number(filter.startPrice),
      endPrice:Number(filter.endPrice)
    }
  }
}
