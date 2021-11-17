import {AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AppGuid} from '../../utils';

declare var $: any;
declare var moment: any;

// Reference https://www.npmjs.com/package/bootstrap-datetime-picker
@Component({
  selector: 'app-date-time-control',
  template: `
    <div class="form-group">
      <label *ngIf="label != ''" style="margin: 5px; cursor: pointer" for="{{id}}">{{label}}{{colon()}}</label>
      <div class="input-group date">
        <input name="{{name}}" id="{{id}}" type="text" value="" type="text" class="form-control pull-right">
        <div class="input-group-append">
          <span class="input-group-text">
            <i class="fa fa-calendar"></i>
          </span>
        </div>
      </div>
    </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppDateTimeControlComponent),
      multi: true
    }
  ]
})
export class AppDateTimeControlComponent implements AfterViewInit, ControlValueAccessor {

  @Input() id: string = this.guid.new();
  @Input() label = '';
  @Input() isColon = true;
  @Input() name = '';
  @Input() showMeridian = false;
  @Input() formatDate = 'mm/dd/yyyy hh:ii:ss'; /// use format of bootstrap datetime picker.
  @Input() container = 'body';
  @Input() moreConfig = {};
  @Input() startView = 2;
  // 0 or 'hour' for the hour view
  // 1 or 'day' for the day view
  // 2 or 'month' for month view (the default)
  // 3 or 'year' for the 12-month overview
  // 4 or 'decade' for the 10-year overview. Useful for date-of-birth datetimepickers.

  @Output() changeEvent: EventEmitter<string> = new EventEmitter<string>();

  private elementRf: any = null;

  private valueV: any;
  private formatDateValueV = 'YYYY-MM-DDTHH:mm:ss'; // use format of moment.

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

      this.elementRf.datetimepicker({
        autoclose: true,
        format: this.formatDate,
        showMeridian: this.showMeridian,
        container: this.container,
        startView: this.startView,
        fontAwesome: true,
        ...this.moreConfig
      });

      this.bindEvent();
    }
  }

  private bindEvent() {
    this.elementRf.datetimepicker().on('changeDate', (e) => {
      this.changeDate(e);
    });

    this.elementRf.on('change', (e) => {
      this.changeDateByInput();
    });
  }

  private setDateTime() {
    this.valueV = this.valueV && this.valueV !== '0000-00-00 00:00:00' ? this.valueV : '';
    if (!this.valueV) {
      this.elementRf.val('').datetimepicker('update');
      return;
    }

    const date = this.isTimestamp(this.valueV)
      ? moment('/Date(' + this.valueV + ')/').format(this.convertFormatDateBootstrapToMoment(this.formatDate))
      : moment(this.valueV, this.formatDateValueV).format(this.convertFormatDateBootstrapToMoment(this.formatDate));
    this.elementRf.datetimepicker('update', date);
  }

  private changeDate(e: any) {
    this.valueV = moment(e.date).format(this.formatDateValueV);
    this.onChangeCallback(this.valueV);
    this.changeEvent.emit(this.valueV);
  }

  private changeDateByInput() {
    this.valueV = moment(this.elementRf.val(), this.convertFormatDateBootstrapToMoment(this.formatDate)).format(this.formatDateValueV);
    this.onChangeCallback(this.valueV);
    this.changeEvent.emit(this.valueV);
  }

  private convertFormatDateBootstrapToMoment(format: string) {
    return format.toUpperCase().replace('II', 'mm').replace('SS', 'ss');
  }

  private isTimestamp(n: any) {
    const parsed = parseFloat(n);

    return !Number.isNaN(parsed) && Number.isFinite(parsed) && /^\d+\.?\d+$/.test(n);
  }
}
