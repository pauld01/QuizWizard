import {Directive, ElementRef, Renderer2, OnInit, Input} from '@angular/core';

@Directive({
  selector: '[appPrefixeLetter]'
})
export class PrefixeLetterDirective {
  @Input() answerIndex : number = 0;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    const prefixEl = this.renderer.createElement('span');
    const prefixText = this.renderer.createText(this.getAnswerLetter() + '.');
    this.renderer.appendChild(prefixEl, prefixText);
    this.renderer.insertBefore(
      this.el.nativeElement,
      prefixEl,
      this.el.nativeElement.firstChild
    )
  }

  getAnswerLetter() {
    return String.fromCharCode(65 + this.answerIndex);
  }


}
