import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FactoryInfo } from 'src/app/interfaces/location/factory/factoryInfo';
import { RegionInfo } from 'src/app/interfaces/location/region/regionInfo';
import { CategoryInfo } from 'src/app/interfaces/product/categoryManagerPage/categoryInfo';
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
    endPrice:10000,
    startCount:0,
    endCount:10000
  }


  @Output() submitForm =new EventEmitter<ProductFilterForm>();
  @Output() resetForm =new EventEmitter();
  


  rawFilterForm:ProductFilterForm={
    title:"",
    regionId:0,
    factoryId:0,
    storageId:0,
    manufacturerId:0,
    categoryId:0,
    unitId:0,
    startPrice:0,
    endPrice:10000,
    startCount:0,
    endCount:10000
  }
  regions: RegionInfo[]=[];
  factories:FactoryInfo[]=[];
  storages:StorageInfo[]=[];
  manufacturers:ManufacturerInfo[]=[];
  categories:CategoryInfo[]=[];
  units:UnitInfo[]=[];

  constructor(
    private readonly regionService:RegionService,
    private readonly factoryService:FactoryService,
    private readonly storageService:StorageService,
    private readonly manufacturerService:ManufacturerService,
    private readonly categoryService:CategoryService,
    private readonly unitService:UnitService) { }

  ngOnInit(): void {
    console.log(this.startFilterForm)
    this.createRawFilterForm(this.startFilterForm);
    this.getRegions();
    this.getFactories();
    this.getStorages();
    this.getManufacturers();
    this.getCategories();
    this.getUnits();
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
    if(startCount>this.startFilterForm.endCount)
      this.startFilterForm.endCount=startCount+1;
    this.startFilterForm.startCount=startCount;
  }

  changeFilterEndCount(endCount:number){
    if (endCount < 1){
      this.rawFilterForm.endCount=1;
      this.rawFilterForm.startCount=0;
      return;
    }
    if(endCount<this.startFilterForm.startCount)
      this.rawFilterForm.startCount=endCount-1;
    this.rawFilterForm.endCount=endCount;
  }

  onSubmitFilter(){
    this.submitForm.emit(this.rawFilterForm);
  }
  clearFilterForm(){
    let currentTitle=this.startFilterForm.title
    this.rawFilterForm={
      title: currentTitle,
      regionId:0,
      factoryId:0,
      storageId:0,
      manufacturerId:0,
      categoryId:0,
      unitId:0,
      startCount:0,
      endCount:10000,
      startPrice:0,
      endPrice:10000
    }
    this.resetForm.emit();
  }

  private getRegions(){
    this.regionService.getRegionsByAccess()
      .subscribe(regions=>{
        this.regions = regions;
      })
  }

  private getFactories(){
    this.isDefaultValue(this.startFilterForm.regionId)
      ? this.getAllFactories()
      : this.getFactoriesByRegionId(this.startFilterForm.regionId);
  }

  private getStorages(){

    if (!this.isDefaultValue(this.startFilterForm.factoryId)){
      this.getStoragesByFactoryId(this.startFilterForm.factoryId);
      return;
    }

    if (!this.isDefaultValue(this.startFilterForm.regionId)){
      this.getStoragesByRegionId(this.startFilterForm.regionId);
      return;
    }

    this.getAllStorages();
  }

  private getManufacturers(){
    this.manufacturerService.getManufacturers()
      .subscribe(manufacturers=>{
        this.manufacturers=manufacturers;
      })
  }

  private getCategories(){
    this.categoryService.getCategories()
      .subscribe(categories=>{
        this.categories=categories;
      })
  }

  private getUnits(){
    this.unitService.getUnits()
      .subscribe(units=>{
        this.units=units;
      })
  }
  
  private createRawFilterForm(form:ProductFilterForm){
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

  private isDefaultValue(value:number):boolean{
    return value == 0;
  }

  private getAllFactories(){
    this.factoryService.getFactoriesByAcces()
      .subscribe(factories=>{
        this.factories=factories;        
    })
  }

  private getFactoriesByRegionId(regionId:number){
    this.factoryService.getFactoryByRegionId(regionId)
      .subscribe(factories=>{
        this.factories=factories; 
    })
  }

  private getAllStorages(){
      this.storageService.getStoragesByAccess("ProductManager")
        .subscribe(storages=>{
          this.storages=storages;        
      })
  }

  private getStoragesByRegionId(regionId:number){
    this.storageService.getStorageByRegionId(regionId)
      .subscribe(storages=>{
        this.storages=storages;
    })
  }

  private getStoragesByFactoryId(factoryId:number){
    this.storageService.getStoragesByFactoryId(factoryId)
      .subscribe(storages=>{
        this.storages=storages;
      })
  }

  private resetValueForm():number{
    return 0;
  }
  
}
