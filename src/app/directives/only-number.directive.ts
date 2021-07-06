import { ElementRef, Input, HostListener, Directive } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[onlyNumber]'
})
export class OnlyNumberDirective {

  @Input()
  public onlyNumber: boolean;

  private _numberRegularExpression = '^[0-9]*$';

  constructor(private element: ElementRef) { }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: Event) {
    const keyboardEvent: KeyboardEvent = <KeyboardEvent>event;
    if (this.onlyNumber) {
      if ([46, 8, 9, 27, 13, 110, 190].indexOf(keyboardEvent.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (keyboardEvent.keyCode === 65 && keyboardEvent.ctrlKey === true) ||
        // Allow: Ctrl+C
        (keyboardEvent.keyCode === 67 && keyboardEvent.ctrlKey === true) ||
        // Allow: Ctrl+V
        (keyboardEvent.keyCode === 86 && keyboardEvent.ctrlKey === true) ||
        // Allow: Ctrl+X
        (keyboardEvent.keyCode === 88 && keyboardEvent.ctrlKey === true) ||
        // Allow: home, end, left, right
        (keyboardEvent.keyCode >= 35 && keyboardEvent.keyCode <= 39)) {
        // const it happen, don't do anything
        return;
      }

      const character: string = String.fromCharCode(keyboardEvent.keyCode);
      const regularExpression: RegExp = new RegExp(this._numberRegularExpression);

      if (regularExpression.test(character)) {
        return;
      }

      keyboardEvent.preventDefault();
    }
  }

}
