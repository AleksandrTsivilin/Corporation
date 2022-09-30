import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { NewTemplateFilter } from 'src/app/interfaces/product/newTemplateFilter';
import { ResponceInfo } from 'src/app/interfaces/responceInfo/responceInfo';
import { ProductTemplateSignalrService } from '../signalrServices/product-template-signalr.service';





@Injectable({
  providedIn: 'root'
})


export class UpdateProductTemplateService {
  

  TemplateChanges$ = new Subject<ResponceInfo>();

  constructor(
    private readonly signalr:ProductTemplateSignalrService
    ) { 
      
    if (!this.signalr.hubConnection?.state){
  
      this.signalr.startConnection();
    }

    this.changesLis();
  }

  delete(id : number){
    this.signalr.hubConnection?.invoke("Delete",id);
  }

  update(filter: NewTemplateFilter, id: number) {
    const newFilter = this.convertForm(filter)
    console.log(newFilter)
    this.signalr.hubConnection?.invoke("Update",id,newFilter);
  }

  private changesLis(){
    this.signalr.hubConnection?.on("changed", (response  : ResponceInfo) =>{
    
      this.TemplateChanges$.next(response)
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
