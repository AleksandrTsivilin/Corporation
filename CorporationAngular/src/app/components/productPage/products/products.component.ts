import { Component, Input, OnInit, Output } from '@angular/core';
import { AvaiablesPermissions } from 'src/app/interfaces/avaiablesPermissions';
import { HeaderTable } from 'src/app/interfaces/header-table';
import { ProductInfo } from 'src/app/interfaces/productsInfo';
import { ProductsService } from 'src/app/services/productPage/products.service';
import { SignalrProductService } from 'src/app/services/productPage/signalr-product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input() @Output() avaiablesPermissions:AvaiablesPermissions={
    canCreate:false,
    canRead:false,
    canUpdate:false,
    canDelete:false,
    canMove:false
  }

  headersTable:HeaderTable[]=[];
  productsInfo:ProductInfo[]=[];
  editProductMode:boolean=false;

  constructor( 
    private readonly service:ProductsService,
    private readonly signalrService:SignalrProductService) { }

  ngOnInit(): void {

    this.headersTable=this.getHeadersTable(); 

    this.service.getProducts()
      .subscribe((result)=>{
        this.productsInfo=result;
        console.log(this.productsInfo)
    },()=>{
      console.log("failed get products")
    })

    if (!this.signalrService.isConnection)
      this.signalrService.startConnection();

    this.productOnLis();

  }


  productOnLis(): void {
    console.log("productOnLis")
    //console.log(this.currentUser.name)
    this.signalrService.hubConnection?.on("productAdd", (newProduct:ProductInfo) => {
      console.log(newProduct);
      this.productsInfo.push(newProduct);
    });
  }

  sortCol(criteria:string){
    // console.log("sortBy");
    // criteria===this._sortCriteria
    //   ? this._ascDirection *= -1
    //   : this._ascDirection = 1;
    
    // this._sortCriteria=criteria;
    // let orderedUsersInfo= this.usersInfo.sort((a:UserInfo,b:UserInfo)=>{
    //   let orderItemFirst=a[criteria];
    //   let orderItemSecond=b[criteria];
    //   const less = -1 * this._ascDirection;
    //   const more = 1 * this._ascDirection;

    //   if (typeof orderItemFirst === 'string') {
    //     return orderItemFirst.toLowerCase() <= orderItemSecond.toLowerCase() ? less : more;
    //   } else {
    //     return orderedUsersInfo <= orderItemSecond ? less : more;
    //   }
      
    // })
    // this.usersInfo=orderedUsersInfo;
  }

  private getHeadersTable():HeaderTable[]{
    const headers= [{
      title:'#',
      isActive:false
    },
    {
      title:"title",
      isActive:true
    },{
      title:"manufacturer",
      isActive:true
    },{
      title:"category",
      isActive:true
    },{
      title:"count",
      isActive:true
    },{
      title:"unit",
      isActive:true
    },{
      title:"price",
      isActive:true
    }];

    if (this.avaiablesPermissions.canUpdate) {
      headers.push({title:"edit",isActive:false});
    }

    if (this.avaiablesPermissions.canDelete) {
      headers.push({title:"delete",isActive:false})
    }

    return headers;
  }

}
