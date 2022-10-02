import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';
import { Component, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { CarouselElementDirective } from 'src/app/directives/carusel-element.directive';



@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {


  @Input() delay: number = 1000;
  @Input() shift: number = 0;

  @ContentChildren(CarouselElementDirective)
  items!: QueryList<CarouselElementDirective>;


  @ViewChild('carousel')
  private carousel!: ElementRef;


  @Output() change = new EventEmitter();
  private player!: AnimationPlayer;

  private timing = '1000ms ease-in';
  private currentSlide=0;

  constructor(
    private builder: AnimationBuilder) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.startAnimation()
  }

  private startAnimation(){

    setTimeout(()=>{
      this.next()
      this.startAnimation();
    },this.delay)
  }


  private next(){
    
    if (this.currentSlide + 1 == this.items.length) {


      let arr = this.items.toArray();
      let first = arr.shift();
      if (first!==undefined){


        arr = arr.concat([first]);
        this.items.reset(arr);
        this.currentSlide--;
        this.transition(0);
      }

    }

    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    this.transition(null);
  }

  private transition(time:any){
    const offset= this.currentSlide*this.shift;
    const myAnimation: AnimationFactory=this.buildAnimation(time,offset)
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  private buildAnimation(time:any,offset:number){
    return this.builder.build([
      animate(
        time == null ? this.timing : 0,
        style({ transform: `translateX(-${offset}px)` })
      )
    ])
  }

}
