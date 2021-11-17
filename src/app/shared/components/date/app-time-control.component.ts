import {AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AppGuid} from '../../utils';

declare var $: any;
declare var moment: any;

// Reference https://www.npmjs.com/package/bootstrap-datetime-picker
@Component({
  selector: 'app-time-control',
  template: `
    <div class="form-group">
      <label *ngIf="label != ''" style="margin: 5px; cursor: pointer" for="{{id}}">{{label}}{{colon()}}</label>
      <div class="input-group date">
        <input name="{{name}}" id="{{id}}" type="text" value="" type="text" class="form-control pull-right">
        <div class="input-group-append">
          <span *ngIf="!hideIcon" class="input-group-text">
            <i class="fa fa-calendar"></i>
          </span>
          <ng-content select="'.input-group-append-more'"></ng-content>
        </div>
      </div>
    </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppTimeControlComponent),
      multi: true
    }
  ]
})
export class AppTimeControlComponent implements AfterViewInit, ControlValueAccessor {
  // @Input() id: string = this.guid.new();
  @Input() id: string = this.guid.new();
  @Input() label = '';
  @Input() isColon = true;
  @Input() name = '';
  @Input() showMeridian = false;
  @Input() formatDate = 'hh:ii'; /// use format of bootstrap datetime picker.
  @Input() container = 'body';
  @Input() hideIcon = false;
  @Input() datePickerDisabled = false;
  @Input() startView = 1;
  @Output() changeEvent: EventEmitter<string> = new EventEmitter<string>();
  // 0 or 'hour' for the hour view
  // 1 or 'day' for the day view
  // 2 or 'month' for month view (the default)
  // 3 or 'year' for the 12-month overview
  // 4 or 'decade' for the 10-year overview. Useful for date-of-birth datetimepickers.
  private elementRf: any = null;
  private valueV: any;

  constructor(
    private root: ElementRef,
    private guid: AppGuid
  ) {
  }

  get value(): any {
    return this.valueV;
  }

  @Input()
  set value(v) {
    this.valueV = v && v !== this.valueV ? v : '';
    this.setTime();
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    this.valueV = value && value !== this.valueV ? value : '';
    this.setTime();
  }

  // Placeholders for the callbacks which are later provided

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

  private changeDate(e: any) {
    this.valueV = moment(e.date).format('HH:mm');
    this.onChangeCallback(this.valueV);
    this.changeEvent.emit(this.valueV);
  }

  private changeDateByInput() {
    this.valueV = moment(this.elementRf.val()).format('HH:mm');
    this.onChangeCallback(this.valueV);
    this.changeEvent.emit(this.valueV);
  }

  private setTime() {
    if (this.elementRf) {
      const date = moment().format('YYYY-MM-DD') + ' ' + this.valueV + ':00';
      this.elementRf.datetimepicker('update', date);
      if (this.datePickerDisabled) {
        this.elementRf.datetimepicker('setStartDate', moment(this.valueV).format('YYYY-MM-DD 00:00:00'));
        this.elementRf.datetimepicker('setEndDate', moment(this.valueV).format('YYYY-MM-DD 23:59:00'));
      }
    }
  }
}
