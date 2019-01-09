import { Directive, ElementRef,   HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective{

  constructor(private el: ElementRef) {  }


@HostListener('mouseenter') onmouseenter() 
{
  this.el.nativeElement.style.backgroundColor ='blue';
}


@HostListener('mouseout') onmouseleave() 
{
  this.el.nativeElement.style.backgroundColor ='white';
}

}
