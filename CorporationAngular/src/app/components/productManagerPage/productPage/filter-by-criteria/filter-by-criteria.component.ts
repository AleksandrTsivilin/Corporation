
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Positions } from 'src/app/components/modals/modal/modal.component';
import { FactoryInfo } from 'src/app/interfaces/location/factory/factoryInfo';
import { RegionInfo } from 'src/app/interfaces/location/region/regionInfo';
import { ModalInfo } from 'src/app/interfaces/modal';
import { CategoryInfo } from 'src/app/interfaces/product/categoryManagerPage/categoryInfo';
import { LoadingOptionFilterByCriteria, LoadingOptionProductPage } from 'src/app/interfaces/product/loadingOptionProductPage';
import { ManufacturerInfo } from 'src/app/interfaces/product/manufacturerManagerPage/manufacturerInfo';
import { ProductFilterForm } from 'src/app/interfaces/product/productFilterForm';
import { UnitInfo } from 'src/app/interfaces/product/unitManagerPage/unitInfo';
import { StorageInfo } from 'src/app/interfaces/storageInfo';
import { FactoryService } from 'src/app/services/factoryManager/factory.service';
import { CategoryService } from 'src/app/services/productPage/CategoriesService/category.service';
import { ManufacturerService } from 'src/app/services/productPage/ManufacturersService/manufacturer.service';
import { StorageService } from 'src/app/services/productPage/StoragesService/storage.service';
import { UnitService } from 'src/app/services/productPage/UnitsService/unit.service';
import { RegionService } from 'src/app/services/regionManager/region.service';
import { maxCount, maxPrice } from '../products/products.component';





@Component({
  selector: 'app-filter-by-criteria',
  templateUrl: './filter-by-criteria.component.html',
  styleUrls: ['./filter-by-criteria.component.scss']
})
export class FilterByCriteriaComponent implements OnInit {

  @Input() startFilterForm:ProductFilterForm={
    title:"",
    regionId:0,
    factoryId:0,
    storageId:0,
    manufacturerId:0,
    categoryId:0,
    unitId:0,
    startPrice:0,
    endPrice:maxPrice,
    startCount:0,
    endCount:maxCount
  }

  @Output () modalInfo:ModalInfo={
    title:"",
    message:"",
    position:Positions.topCenter
  }


  @Output() submitForm =new EventEmitter<ProductFilterForm>();
  //@Output() resetForm =new EventEmitter();
  //@Output() resetOptionForm =new EventEmitter<ProductFilterForm>();

  loadingOptionFilterByCriteria:LoadingOptionFilterByCriteria={
    isComplitedLoadingRegions:false,
    isCompliteLoadingFactories:false,
    isComplitedLoadingStorages:false,
    isComplitedLoadingManufacturers:false,
    isComplitedLoadingCategories:false,
    isComplitedLoadingUnits:false
  }

  rawFilterForm:ProductFilterForm={
    title:"",
    regionId:0,
    factoryId:0,
    storageId:0,
    manufacturerId:0,
    categoryId:0,
    unitId:0,
    startPrice:0,
    endPrice:maxPrice,
    startCount:0,
    endCount:maxCount
  }
  regions: RegionInfo[]=[];
  factories:FactoryInfo[]=[];
  storages:StorageInfo[]=[];
  manufacturers:ManufacturerInfo[]=[];
  categories:CategoryInfo[]=[];
  units:UnitInfo[]=[];

  stepRangeCount:number=10;
  stepRangePrice:number=500;
  filterMaxCount=maxCount;
  filterMaxPrice=maxPrice;

  isShowModalWarning:boolean=false;

  constructor(
    private readonly regionService:RegionService,
    private readonly factoryService:FactoryService,
    private readonly storageService:StorageService,
    private readonly manufacturerService:ManufacturerService,
    private readonly categoryService:CategoryService,
    private readonly unitService:UnitService) { }

  ngOnInit(): void {
    this.createRawFilterForm();
    this.getRegions();
    this.getFactories();
    this.getStorages();
    this.getManufacturers();
    this.getCategories();
    this.getUnits();
    console.log(this.rawFilterForm)
  }

  changeFilterRegion(){
    const selectedRegionId=Number(this.rawFilterForm.regionId);
    
    this.rawFilterForm.factoryId=this.resetValueForm();  
    this.getFactoriesByRegionId(selectedRegionId);

    this.rawFilterForm.storageId=this.resetValueForm();    
    this.getStoragesByRegionId(selectedRegionId);    
  }

  changeFilterFactory(){
    const selectedFactoryId=Number(this.rawFilterForm.factoryId);
    this.rawFilterForm.storageId=this.resetValueForm();
    this.getStoragesByFactoryId(selectedFactoryId);    
  }

  changeFilterStartPrice(startPrice:number){
    if (startPrice>this.rawFilterForm.endPrice) 
      this.rawFilterForm.endPrice=startPrice+1;
    this.rawFilterForm.startPrice=startPrice;
  }
  changeFilterEndPrice(endPrice:number){
    if (endPrice < 1){
      this.rawFilterForm.endPrice=1;
      this.rawFilterForm.startPrice=0;
      return;
    }
    if(endPrice<this.rawFilterForm.startPrice)
      this.rawFilterForm.startPrice=endPrice-1;
    this.rawFilterForm.endPrice=endPrice;
  }

  changeFilterStartCount(startCount:number){
    if(startCount>this.rawFilterForm.endCount)
      this.rawFilterForm.endCount=startCount+1;
    this.rawFilterForm.startCount=startCount;
  }

  changeFilterEndCount(endCount:number){
    if (endCount < 1){
      this.rawFilterForm.endCount=1;
      this.rawFilterForm.startCount=0;
      return;
    }
    if(endCount<this.rawFilterForm.startCount)
      this.rawFilterForm.startCount=endCount-1;
    this.rawFilterForm.endCount=endCount;
  }

  isEmptyForm():boolean{
    return this.isDefaultValue(this.rawFilterForm.regionId)
            && this.isDefaultValue(this.rawFilterForm.factoryId)
            && this.isDefaultValue(this.rawFilterForm.storageId)
            && this.isDefaultValue(this.rawFilterForm.manufacturerId)
            && this.isDefaultValue(this.rawFilterForm.categoryId)
            && this.isDefaultValue(this.rawFilterForm.unitId)
            && this.isDefaultValue(this.rawFilterForm.startCount)
            && this.rawFilterForm.endCount===maxCount
            && this.isDefaultValue(this.rawFilterForm.startPrice)
            && this.rawFilterForm.endPrice===maxPrice
  }
  onSubmitFilter(){
    this.submitForm.emit(this.rawFilterForm);
  }

  clearFilterForm(){
    
    this.modalInfo={
      title:"Are you sure clear filter",
      message:"more data",
      position:Positions.topCenter

    }
    this.isShowModalWarning=true;

    // this.resetSelectedRegion();
    // this.resetSelectedManufacturer();
    // this.resetSelectedCategory();
    // this.resetSelectedUnit();
    // this.resetSelectedRangeCount();
    // this.resetSelectedRangePrice();
    //this.submitForm.emit(this.rawFilterForm)
  }

  closeModalWarning(answer:boolean){
    if (answer){
      this.resetSelectedRegion();
      this.resetSelectedManufacturer();
      this.resetSelectedCategory();
      this.resetSelectedUnit();
      this.resetSelectedRangeCount();
      this.resetSelectedRangePrice();      
      this.submitForm.emit(this.rawFilterForm);
    }
    this.isShowModalWarning=false;
    
  }

  onSubmitFilterWithSave(){
    console.log("onSubmitFilterWithSave")
  }

  isSelectedSomething(option:Number):boolean{
    return option>0;
  }

  isSelectedRangeCount():boolean{
    return this.rawFilterForm.startCount>0 || this.rawFilterForm.endCount<this.filterMaxCount;
  }

  isSelectedRangePrice():boolean{
    return this.rawFilterForm.startPrice>0 || this.rawFilterForm.endPrice<this.filterMaxPrice;
  }

  resetSelectedRegion(){    
    this.rawFilterForm.regionId=this.resetValueForm();
    this.rawFilterForm.factoryId=this.resetValueForm();
    this.rawFilterForm.storageId=this.resetValueForm();
    this.getAllFactories();
    this.getAllStorages();
  }

  resetSelectedFactory(){
    this.rawFilterForm.factoryId=this.resetValueForm();
    this.rawFilterForm.storageId=this.resetValueForm();
    this.isDefaultValue(this.rawFilterForm.regionId)
      ? this.getAllStorages()
      : this.getStoragesByRegionId(this.rawFilterForm.regionId);
    //this.getStorages();
  }

  resetSelectedStorage(){
    this.rawFilterForm.storageId=this.resetValueForm();
  }

  resetSelectedManufacturer(){
    this.rawFilterForm.manufacturerId=this.resetValueForm();
  }

  resetSelectedCategory(){
    this.rawFilterForm.categoryId=this.resetValueForm();
  }

  resetSelectedUnit(){
    this.rawFilterForm.unitId=this.resetValueForm();
  }

  resetSelectedRangeCount(){
    this.rawFilterForm.startCount=this.resetValueForm();
    this.rawFilterForm.endCount=this.filterMaxCount;
  }

  resetSelectedRangePrice(){
    this.rawFilterForm.startPrice=this.resetValueForm();
    this.rawFilterForm.endPrice=this.filterMaxPrice;
  }

  private getRegions(){
    this.loadingOptionFilterByCriteria.isComplitedLoadingRegions=false;
    this.regionService.getRegionsByAccess()
      .subscribe(regions=>{
        this.regions = regions;
        this.loadingOptionFilterByCriteria.isComplitedLoadingRegions=true;
      })
  }

  private getFactories(){   
    this.isDefaultValue(this.startFilterForm.regionId)
      ? this.getAllFactories()
      : this.getFactoriesByRegionId(this.startFilterForm.regionId);
  }

  private getStorages(){


    if (!this.isDefaultValue(this.startFilterForm.regionId)
    && this.isDefaultValue(this.startFilterForm.factoryId)){
      this.getStoragesByRegionId(this.startFilterForm.regionId);  
      return;    
    }

    if (!this.isDefaultValue(this.startFilterForm.factoryId)){
      this.getStoragesByFactoryId(this.startFilterForm.factoryId);  
      return;    
    }
    
    
    this.getAllStorages();
  }

  private getManufacturers(){
    this.loadingOptionFilterByCriteria.isComplitedLoadingManufacturers=false
    this.manufacturerService.getManufacturers()
      .subscribe(manufacturers=>{
        this.manufacturers=manufacturers;
        this.loadingOptionFilterByCriteria.isComplitedLoadingManufacturers=true;
      })
  }

  private getCategories(){
    this.loadingOptionFilterByCriteria.isComplitedLoadingCategories=false;
    this.categoryService.getCategories()
      .subscribe(categories=>{
        this.categories=categories;
        this.loadingOptionFilterByCriteria.isComplitedLoadingCategories=true;
      })
  }

  private getUnits(){
    this.loadingOptionFilterByCriteria.isComplitedLoadingUnits=false;
    this.unitService.getUnits()
      .subscribe(units=>{
        this.units=units;
        this.loadingOptionFilterByCriteria.isComplitedLoadingUnits=true;
      })
  }
  
  private createRawFilterForm(){
    this.rawFilterForm={
      title : this.startFilterForm.title,
      regionId : this.startFilterForm.regionId,
      factoryId : this.startFilterForm.factoryId,
      storageId : this.startFilterForm.storageId,
      manufacturerId : this.startFilterForm.manufacturerId,
      categoryId : this.startFilterForm.categoryId,
      unitId : this.startFilterForm.unitId,
      startCount : this.startFilterForm.startCount,
      endCount : this.startFilterForm.endCount,
      startPrice : this.startFilterForm.startPrice,
      endPrice : this.startFilterForm.endPrice
    }
  }

  

  private getAllFactories(){
    this.loadingOptionFilterByCriteria.isCompliteLoadingFactories=false;
    this.factoryService.getFactoriesByAcces()
      .subscribe(factories=>{
        this.factories=factories;   
        this.loadingOptionFilterByCriteria.isCompliteLoadingFactories=true     
    })
  }

  private getFactoriesByRegionId(regionId:number){
    this.loadingOptionFilterByCriteria.isCompliteLoadingFactories=false;
    this.factoryService.getFactoryByRegionId(regionId)
      .subscribe(factories=>{
        this.factories=factories; 
        this.loadingOptionFilterByCriteria.isCompliteLoadingFactories=true;
    })
  }

  private getAllStorages(){
    this.loadingOptionFilterByCriteria.isComplitedLoadingStorages=false;
      this.storageService.getStoragesByAccess("ProductManager")
        .subscribe(storages=>{
          this.storages=storages; 
          this.loadingOptionFilterByCriteria.isComplitedLoadingStorages=true;       
      })
  }

  private getStoragesByRegionId(regionId:number){
    this.loadingOptionFilterByCriteria.isComplitedLoadingStorages=false;
    this.storageService.getStorageByRegionId(regionId)
      .subscribe(storages=>{
        this.storages=storages;
        this.loadingOptionFilterByCriteria.isComplitedLoadingStorages=true;
        
    })
  }

  private getStoragesByFactoryId(factoryId:number){
    this.loadingOptionFilterByCriteria.isComplitedLoadingStorages=false;
    this.storageService.getStoragesByFactoryId(factoryId)
      .subscribe(storages=>{
        this.storages=storages;
        this.loadingOptionFilterByCriteria.isComplitedLoadingStorages=true;
      })
  }


  private isDefaultValue(value:number):boolean{
    return value == 0;
  }

  private resetValueForm():number{
    return 0;
  }

  // private applyResetOption(option:number){
  //   if (!this.isDefaultValue(option))
  //       this.resetOptionForm.emit(this.rawFilterForm);
  // }
  
}
