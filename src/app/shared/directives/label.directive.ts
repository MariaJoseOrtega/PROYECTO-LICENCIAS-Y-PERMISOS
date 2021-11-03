import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {toOptionalLiteralArray} from '@angular/compiler/src/render3/partial/util';

@Directive({
  selector: '[appLabel]'
})
export class LabelDirective implements OnInit {
  private _touched: boolean = false;
  private _dirty: boolean = false;
  private _valid: boolean = false;
  private _required: boolean = false;
  private i: any;
  nativeElement: any;
  @Input() label: string = '';

  @Input() set required(value: boolean) {
    this._required = value;
  }

  @Input() set touched(value: boolean) {
    // console.log('touched: ' + value);
    this._touched = value;
    this.setIcon();
  }

  @Input() set dirty(value: boolean) {
    // console.log('dirty: ' + value);
    this._dirty = value;
    this.setIcon();
  }

  @Input() set valid(value: boolean) {
    // console.log('valid: ' + value);
    this._valid = value;
    this.setIcon();
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.nativeElement = elementRef.nativeElement;
    this.i = this.renderer.createElement('i');
  }

  ngOnInit(): void {
    if (this._required) {
      this.setFieldRequired();
    } else {
      this.setFieldNoRequired();
    }
  }

  setFieldRequired() {
    this.nativeElement.innerText = this.label + ' ';
    const i = this.renderer.createElement('i');
    i.innerText = ' * ';
    this.renderer.addClass(i, 'p-error');
    this.renderer.appendChild(this.nativeElement, i);
  }

  setFieldNoRequired() {
    this.nativeElement.innerText = this.label + ' ';
  }

  setIcon() {
    if (this._valid != undefined) {

      // this.renderer.addClass(this.i, 'pi');

      if (this._touched || this._dirty) {
        if (this._valid) {
          // this.renderer.removeClass(this.i, 'p-error');
          // this.renderer.removeClass(this.i, 'pi-times');
          // this.renderer.addClass(this.i, 'pi-check');
          // this.renderer.addClass(this.i, 'p-success');
        } else {
          // this.renderer.removeClass(this.i, 'p-success');
          // this.renderer.removeClass(this.i, 'pi-check');
          // this.renderer.addClass(this.i, 'pi-times');
          // this.renderer.addClass(this.i, 'p-error');
        }
        // this.renderer.appendChild(this.nativeElement, this.i);
      }
    }
  }
}
