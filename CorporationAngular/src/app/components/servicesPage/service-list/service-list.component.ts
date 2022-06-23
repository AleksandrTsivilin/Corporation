import { Component, OnInit } from '@angular/core';
import { AvaiableUser } from 'src/app/interfaces/auth/avaiablesUserForm';
import { TokenData } from 'src/app/interfaces/auth/tokenData';
import { AuthService } from 'src/app/services/auth.service';

enum CardTypes{
  NONE,
  PERSONAL_DATA,
  USERS,
  ADD_USER,
  PRODUCTS,
  ADD_PRODUCT,
  ADD_MOVEMENT_PRODUCTS 
}

interface UserPermissionsByRole{
  canReadUsers:boolean,
  canCreateUser:boolean,
  canReadProducts:boolean,
  canCreateProduct:boolean,
  canCreateMovementProducts:boolean
}


@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {

  // tokenData:TokenData={
  //   userId:0,
  //   username:"",
  //   avaiables:[],
  //   department:0,
  //   factory:0,
  //   region:0
  // }

  permissions:UserPermissionsByRole={
    canCreateUser:false,
    canReadUsers:false,
    canCreateProduct:false,
    canReadProducts:false,
    canCreateMovementProducts:false
  }
  cards=CardTypes;
  selectedCard:number = CardTypes.NONE;

  isSelectedService:boolean=true;
  isScrolling:boolean=false;
  constructor(private readonly authService:AuthService) { }

  ngOnInit(): void {
    this.authService.tokenData$.subscribe(tokenData=>{
      if (tokenData !==null) {
        this.createPermissions(tokenData.avaiables);
      }
    }) 
  }
  

  toggleCard(type:number){
    type===this.selectedCard 
      ? this.selectedCard=this.cards.NONE
      : this.selectedCard=type;
  }

  selectService(){
    this.isSelectedService=true;
  }

  private createPermissions(avaiables:AvaiableUser[]) {
    console.log(avaiables)
    avaiables.map(avaiable=>{
      this.setUserPermissions(avaiable);
      this.setProductPermissions(avaiable);
      this.setMovementProductsPermissions(avaiable);
    })     
   
  }
  private setUserPermissions(avaiable: AvaiableUser) {
    if (avaiable.role.title!=='UserManager') return;

    const permissionTitles = avaiable.permissions.map(_=>_.title);
    this.permissions.canCreateUser=this.canCreate(permissionTitles);

    this.permissions.canReadUsers = this.canRead(permissionTitles);
  }

  

  private setProductPermissions(avaiable: AvaiableUser){
    if (avaiable.role.title!=='ProductManager') return;

    const permissionTitles = avaiable.permissions.map(_=>_.title);
    this.permissions.canCreateProduct=this.canCreate(permissionTitles);

    this.permissions.canReadProducts = this.canRead(permissionTitles);
  }

  private setMovementProductsPermissions(avaiable:AvaiableUser){
    if (avaiable.role.title!=='ProductMovementManager') return;
    
    const permissionTitles = avaiable.permissions.map(_=>_.title);
    this.permissions.canCreateMovementProducts=this.canCreate(permissionTitles);

    
  }

  private canRead(permissions:string[]) : boolean {
    return permissions.includes("Read") || permissions.includes("Update") || permissions.includes("Delete");
  }

  private canCreate(permissions:string[]) : boolean {
    return permissions.includes("Create");
  }

  

}
