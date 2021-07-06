import { Directive, OnInit, Self, ElementRef, Renderer2 } from '@angular/core';
import { DefaultValueAccessor, NgControl } from '@angular/forms';

declare var $: any;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[time-picker]'
})
export class TimePickerDirective extends DefaultValueAccessor implements OnInit {

  constructor(@Self() private ngControl: NgControl,
    private elementRef: ElementRef, private renderer2: Renderer2) {
    super(renderer2, elementRef, false);
  }

  public onChange = (_: any) => {
    this.ngControl.control.setValue(this.elementRef.nativeElement.value);
  }

  public ngOnInit(): void {
    $(this.elementRef.nativeElement).parent().clockpicker({
      placement: 'top',
      autoclose: true,
      afterDone: () => {
        this.onChange(this.elementRef.nativeElement.value);
      }
    });
  }

}
