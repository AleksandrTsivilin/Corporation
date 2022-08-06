
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Positions } from 'src/app/components/modals/modal/modal.component';
import { FactoryInfo } from 'src/app/interfaces/location/factory/factoryInfo';
import { RegionInfo } from 'src/app/interfaces/location/region/regionInfo';
import { GetDataModal, ModalInfo, ResponceGetDataModal } from 'src/app/interfaces/modal';
import { CategoryInfo } from 'src/app/interfaces/product/categoryManagerPage/categoryInfo';
import { CriteriaProduct } from 'src/app/interfaces/product/criteriaProduct';
import { LoadingOptionFilterByCriteria} from 'src/app/interfaces/product/loadingOptionProductPage';
import { ManufacturerInfo } from 'src/app/interfaces/product/manufacturerManagerPage/manufacturerInfo';
import { TemplateFilter } from 'src/app/interfaces/product/templateFilter';
import { UnitInfo } from 'src/app/interfaces/product/unitManagerPage/unitInfo';
import { StorageInfo } from 'src/app/interfaces/storageInfo';
import { FactoryService } from 'src/app/services/factoryManager/factory.service';
import { CategoryService } from 'src/app/services/productPage/CategoriesService/category.service';
import { ManufacturerService } from 'src/app/services/productPage/ManufacturersService/manufacturer.service';
import { ProductTemplateService } from 'src/app/services/productPage/productTemplate/product-template.service';
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


  @Input() startFilter:TemplateFilter={
      id:0,
      title:"",
      criteria:{
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
  }

  @Output () modalInfo:ModalInfo={
    title:"",
    message:"",
    position:Positions.topCenter
  }

  @Output () getInfoModal : GetDataModal = {
    title: 'Input title for new template',
    position: 0
  }


  @Output() submitForm =new EventEmitter<TemplateFilter | null>();

  loadingOptionFilterByCriteria:LoadingOptionFilterByCriteria={
    isComplitedLoadingRegions:false,
    isCompliteLoadingFactories:false,
    isComplitedLoadingStorages:false,
    isComplitedLoadingManufacturers:false,
    isComplitedLoadingCategories:false,
    isComplitedLoadingUnits:false
  }


  rawFilter: CriteriaProduct ={
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

  title:string = "";
  

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
  isShowModalGetInfo:boolean =false;

  isChangedOption:boolean=false;
  isEmptyFilter:boolean =true;

  constructor(
    private readonly regionService:RegionService,
    private readonly factoryService:FactoryService,
    private readonly storageService:StorageService,
    private readonly manufacturerService:ManufacturerService,
    private readonly categoryService:CategoryService,
    private readonly unitService:UnitService,
    private readonly templateService: ProductTemplateService
    ) { }

  ngOnInit(): void {
    
    this.title = this.startFilter.title;
    this.rawFilter = this.getRawFilter(this.startFilter.criteria);

    this.getRegions();
    this.getFactories();
    this.getStorages();
    this.getManufacturers();
    this.getCategories();
    this.getUnits();

    this.isEmptyFilter=this.isEmptyForm();
  }

  changedFilter(){
    this.isChangedOption=true;
    this.title = "new template";
    this.isEmptyFilter = this.isEmptyForm();
  }

  changeFilterRegion(){
    const selectedRegionId=Number(this.rawFilter.regionId);
    
    this.rawFilter.factoryId=this.resetValueForm();  
    this.getFactoriesByRegionId(selectedRegionId);

    this.rawFilter.storageId=this.resetValueForm();    
    this.getStoragesByRegionId(selectedRegionId);  
    
    this.changedFilter();
  }

  changeFilterFactory(){
    const selectedFactoryId=Number(this.rawFilter.factoryId);
    this.rawFilter.storageId=this.resetValueForm();
    this.getStoragesByFactoryId(selectedFactoryId); 
    
    this.changedFilter();
  }  

  changeFilterStartPrice(startPrice:number){
    if (startPrice>this.rawFilter.endPrice) 
      this.rawFilter.endPrice=startPrice+1;
    this.rawFilter.startPrice=startPrice;

    this.changedFilter();
  }

  changeFilterEndPrice(endPrice:number){

    this.changedFilter();

    if (endPrice < 1){
      this.rawFilter.endPrice=1;
      this.rawFilter.startPrice=0;
      return;
    }
    if(endPrice<this.rawFilter.startPrice)
      this.rawFilter.startPrice=endPrice-1;
    this.rawFilter.endPrice=endPrice;
  }

  changeFilterStartCount(startCount:number){
    if(startCount>this.rawFilter.endCount)
      this.rawFilter.endCount=startCount+1;
    this.rawFilter.startCount=startCount;

    this.changedFilter();
  }

  changeFilterEndCount(endCount:number){

    this.changedFilter();

    if (endCount < 1){
      this.rawFilter.endCount=1;
      this.rawFilter.startCount=0;
      return;
    }
    if(endCount<this.rawFilter.startCount)
      this.rawFilter.startCount=endCount-1;
    this.rawFilter.endCount=endCount;
  }  
  
  onSubmitFilter(){
    
    
    this.isEmptyFilter
    ? this.submitForm.emit(null)
    : this.submitForm.emit({
      id:this.isChangedOption ? 0: this.startFilter.id,
      title:this.title,
      //title:this.isChangedOption ? 'new template': this.startFilter.title,
      criteria:this.rawFilter});
  }

  clearFilterForm(){
    
    this.modalInfo={
      title:"Are you sure clear filter",
      message:"more data",
      position:Positions.topCenter

    }
    this.isShowModalWarning=true;
  }

  closeModalWarning(answer:boolean){
    if (answer){
      this.resetSelectedRegion();
      this.resetSelectedManufacturer();
      this.resetSelectedCategory();
      this.resetSelectedUnit();
      this.resetSelectedRangeCount();
      this.resetSelectedRangePrice(); 
      this.submitForm.emit(null);
    }
    this.isShowModalWarning=false;
    
  }

  onSubmitFilterWithSave(){
    this.isShowModalGetInfo = true;
  }

  closeGetInfoModal(responce : ResponceGetDataModal){

    this.title = responce.data;
    this.templateService.add({
      title: responce.data,
      regionId: this.rawFilter.regionId,
      factoryId: this.rawFilter.factoryId,
      storageId: this.rawFilter.storageId,
      manufacturerId: this.rawFilter.manufacturerId,
      categoryId: this.rawFilter.categoryId,
      unitId: this.rawFilter.unitId,
      startCount: this.rawFilter.startCount,
      endCount: this.rawFilter.endCount,
      startPrice: this.rawFilter.startPrice,
      endPrice: this.rawFilter.endPrice
    })
    this.isShowModalGetInfo = false;
    this.onSubmitFilter();
    
  }

  isSelectedSomething(option:Number):boolean{
    return option>0;
  }

  isSelectedRangeCount():boolean{
    return this.rawFilter.startCount>0 || this.rawFilter.endCount<this.filterMaxCount;
  }

  isSelectedRangePrice():boolean{
    return this.rawFilter.startPrice>0 || this.rawFilter.endPrice<this.filterMaxPrice;
  }

  resetSelectedRegion(){    
    this.rawFilter.regionId=this.resetValueForm();
    this.rawFilter.factoryId=this.resetValueForm();
    this.rawFilter.storageId=this.resetValueForm();
    this.getAllFactories();
    this.getAllStorages();

    this.changedFilter();
  }

  resetSelectedFactory(){
    this.rawFilter.factoryId=this.resetValueForm();
    this.rawFilter.storageId=this.resetValueForm();
    this.isDefaultValue(this.rawFilter.regionId)
      ? this.getAllStorages()
      : this.getStoragesByRegionId(this.rawFilter.regionId);

      this.changedFilter();
  }

  resetSelectedStorage(){
    this.rawFilter.storageId=this.resetValueForm();

    this.changedFilter();
  }

  resetSelectedManufacturer(){
    this.rawFilter.manufacturerId=this.resetValueForm();
    this.changedFilter();
  }

  resetSelectedCategory(){
    this.rawFilter.categoryId=this.resetValueForm();
    this.changedFilter();
  }

  resetSelectedUnit(){
    this.rawFilter.unitId=this.resetValueForm();
    this.changedFilter();
  }

  resetSelectedRangeCount(){
    this.rawFilter.startCount=this.resetValueForm();
    this.rawFilter.endCount=this.filterMaxCount;
    this.changedFilter();
  }

  resetSelectedRangePrice(){
    this.rawFilter.startPrice=this.resetValueForm();
    this.rawFilter.endPrice=this.filterMaxPrice;
    this.changedFilter();
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
    this.isDefaultValue(this.startFilter.criteria.regionId)
      ? this.getAllFactories()
      : this.getFactoriesByRegionId(this.startFilter.criteria.regionId);
  }

  private getStorages(){

    if (!this.isDefaultValue(this.startFilter.criteria.regionId)
    && this.isDefaultValue(this.startFilter.criteria.factoryId)){
      this.getStoragesByRegionId(this.startFilter.criteria.regionId);  
      return;    
    }

    if (!this.isDefaultValue(this.startFilter.criteria.factoryId)){
      this.getStoragesByFactoryId(this.startFilter.criteria.factoryId);  
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

  private getRawFilter(criteria:CriteriaProduct) : CriteriaProduct{
     return {
      regionId : criteria.regionId,
      factoryId : criteria.factoryId,
      storageId : criteria.storageId,
      manufacturerId : criteria.manufacturerId,
      categoryId : criteria.categoryId,
      unitId : criteria.unitId,
      startCount : criteria.startCount,
      endCount : criteria.endCount,
      startPrice : criteria.startPrice,
      endPrice : criteria.endPrice
    }
  }  

  private isEmptyForm():boolean{
    return this.isDefaultValue(this.rawFilter.regionId)
            && this.isDefaultValue(this.rawFilter.factoryId)
            && this.isDefaultValue(this.rawFilter.storageId)
            && this.isDefaultValue(this.rawFilter.manufacturerId)
            && this.isDefaultValue(this.rawFilter.categoryId)
            && this.isDefaultValue(this.rawFilter.unitId)
            && this.isDefaultValue(this.rawFilter.startCount)
            && this.rawFilter.endCount===maxCount
            && this.isDefaultValue(this.rawFilter.startPrice)
            && this.rawFilter.endPrice===maxPrice
  }

  private isDefaultValue(value:number):boolean{
    return value == 0;
  }

  private resetValueForm():number{
    return 0;
  }
}
