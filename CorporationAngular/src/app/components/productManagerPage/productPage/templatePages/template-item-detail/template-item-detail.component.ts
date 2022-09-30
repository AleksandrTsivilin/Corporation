import { animate, AnimationBuilder,  style } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Routers} from 'src/app/enums/routers/routers'
import { TemplateFilterWithDetails } from 'src/app/interfaces/product/tempalte/templateFilterWithDetails';
import { ProductTemplateService } from 'src/app/services/productPage/productTemplate/product-template.service';
import { UpdateProductTemplateService } from 'src/app/services/productPage/updateServices/update-product-template.service';


@Component({
  selector: 'app-template-item-detail',
  templateUrl: './template-item-detail.component.html',
  styleUrls: ['./template-item-detail.component.scss'],
  providers:[UpdateProductTemplateService]
})
export class TemplateItemDetailComponent implements OnInit, OnDestroy {

  
  @ViewChild('shiftCard') elementRef: ElementRef | undefined;
  @ViewChild('sign_lg') elementSignRef: ElementRef | undefined;
  private shift = 50;
  
  routers = Routers;
  
  isLoading:boolean = true;

  templateInfo : TemplateFilterWithDetails  | null = null;

  @Input() id: number = 0;
  @Input() index:number=0;
  @Output() removeItem = new EventEmitter();
  @Output() editItem = new EventEmitter();

  @HostBinding('class')  
  hostClass="hidden"


  toOpen:boolean = false;
  isOpened:boolean = false;
  isSomethingWrong: boolean = false;


  constructor(
    private readonly templateService:ProductTemplateService,
    private readonly builder : AnimationBuilder
    ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit() { 
    this.createAnimation();
    this.createPositionSignLg();
   }


  @HostListener('click',['$event'])
  hostClick(event:Event){
    event.stopPropagation();
  }

  @HostListener('window:click')
  hide(){
    if (this.toOpen) {      
      this.toOpen= false;
      return;
    }

    this.hostClass="hidden"
    this.isOpened = false;
  }

  toggle(){

    if (!this.isOpened) {
      this.toOpen = true;
      this.isOpened = true;
      this.hostClass = "";
      this.getDetails();
    }
  }

  remove(){
    this.removeItem.emit();

  }

  edit(){
    this.editItem.emit();
  }

  close(){
    this.hostClass="hidden"
    this.isOpened = false;
  }

  private getDetails(){
    this.isLoading = true;
    this.templateService.getDetails(this.id)
      .subscribe(templateInfo=>{

        templateInfo 
          ? this.templateInfo = templateInfo
          : this.isSomethingWrong = true;

        this.isLoading = false;
      },()=>{
        this.isLoading = false;
      })
  }

  private createAnimation(){
    const offset = this.index*this.shift*(-1);

    const myAnimation = this.builder.build([
      style({ height: '*' }),
      animate(0, style({ transform: `translateY(${offset}px)` }))
    ])

    const player = myAnimation.create(this.elementRef?.nativeElement)
    player.play();
  }

  private createPositionSignLg(){
    const offset = this.index*this.shift;

    const myAnimation = this.builder.build([
      style({ height: '*' }),
      animate(0, style({ 'margin-top' : `${offset}px` }))
    ])

    const player = myAnimation.create(this.elementSignRef?.nativeElement);
    player.play()
  }

}
