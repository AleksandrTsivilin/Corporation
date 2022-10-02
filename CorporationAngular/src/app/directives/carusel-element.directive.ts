import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appCarouselElement]'
})
export class CarouselElementDirective {

  constructor(public readonly tpl:TemplateRef<any>) { }

}
