import {AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AppGuid} from '../../utils';

declare var $: any;
declare var moment: any;

// Reference https://bootstrap-datepicker.readthedocs.io/en/latest/
@Component({
  selector: 'app-date-control',
  template: `
    <div class="form-group {{classAppend}}">
      <label *ngIf="label != ''" style="margin-bottom: .5rem; cursor: pointer" for="{{id}}">{{label}}{{colon()}}</label>
      <div class="input-group date">
        <ng-content select="'.input-group-prepend'"></ng-content>
        <input name="{{name}}" id="{{id}}" type="text" value="" type="text" placeholder="MM/dd/YYYY" class="form-control pull-right">
        <div class="input-group-append">
          <span class="input-group-text">
            <i class="fa fa-calendar"></i>
          </span>
          <ng-content select="'.input-group-append-more'"></ng-content>
        </div>
      </div>
    </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppDateControlComponent),
      multi: true
    }
  ]
})
export class AppDateControlComponent implements AfterViewInit, ControlValueAccessor {

  @Input() public id: string = this.guid.new();
  @Input() public label = '';
  @Input() public isColon = true;
  @Input() public name = '';
  @Input() public formatDate = 'mm/dd/yyyy';
  @Input() public classAppend = '';
  @Input() public container = 'body';

  @Output() changeEvent: EventEmitter<string> = new EventEmitter<string>();

  private elementRf: any = null;

  private valueV: any;
  private formatDateValueV = 'YYYY-MM-DD';

  constructor(
    private root: ElementRef,
    private guid: AppGuid
  ) {
  }

  // Placeholders for the callbacks which are later providesd

  get value(): any {
    return this.valueV;
  }

  @Input()
  set value(v) {
    if (v !== this.valueV) {
      this.valueV = v;
      this.setDateTime();
    }
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.valueV) {
      this.valueV = value;
      this.initUI();
      this.setDateTime();
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  ngAfterViewInit() {
    this.initUI();
  }

  public colon() {
    return this.isColon ? ':' : '';
  }

  // by the Control Value Accessor
  private onTouchedCallback: () => void = () => {
  };

  private onChangeCallback: (_: any) => void = () => {
  };

  private initUI() {
    if (this.elementRf == null) {
      this.elementRf = $(this.root.nativeElement.querySelector('input'));

      this.elementRf.datepicker({
        autoclose: true,
        format: this.formatDate,
        container: this.container
      });

      this.bindEvent();
    }
  }

  private bindEvent() {
    this.elementRf.datepicker().on('changeDate', (e) => {
      this.changeDate(e);
    });

    this.elementRf.on('change', (e) => {
      this.changeDateByInput();
    });
  }

  private setDateTime() {
    this.valueV = this.valueV && this.valueV !== '0000-00-00 00:00:00' ? this.valueV : '';
    if (!this.valueV) {
      this.elementRf.val('').datepicker('update');
      return;
    }

    const date = this.isTimestamp(this.valueV) ? moment('/Date(' + this.valueV + ')/').format(this.formatDate.toUpperCase())
      : moment(this.valueV, this.formatDateValueV).format(this.formatDate.toUpperCase());
    this.elementRf.datepicker('update', date);
  }

  private changeDate(e: any) {
    this.valueV = moment(e.date).format(this.formatDateValueV);
    this.onChangeCallback(this.valueV);
    this.changeEvent.emit(this.valueV);
  }

  private changeDateByInput() {
    this.valueV = moment(this.elementRf.val(), this.formatDate.toUpperCase()).format(this.formatDateValueV);
    this.onChangeCallback(this.valueV);
    this.changeEvent.emit(this.valueV);
  }

  private isTimestamp(n: any) {
    const parsed = parseFloat(n);

    return !Number.isNaN(parsed) && Number.isFinite(parsed) && /^\d+\.?\d+$/.test(n);
  }
}
