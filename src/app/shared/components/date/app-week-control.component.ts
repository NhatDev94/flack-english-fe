import {AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AppGuid} from '../../utils';
import {DATETIME_FORMAT} from '../../../core/constant/date-time-format.constant';

declare var $: any;
declare var moment: any;

// Reference https://bootstrap-datepicker.readthedocs.io/en/latest/
@Component({
  selector: 'app-week-picker-control',
  template: `
    <div class="form-group {{classAppend}}">
      <label *ngIf="label != ''" style="margin-bottom: .5rem; cursor: pointer" for="{{id}}">{{label}}{{colon()}}</label>
      <div class="input-group date">
        <ng-content select="'.input-group-prepend'"></ng-content>
        <input name="{{name}}" id="{{id}}" type="text" value="" type="text" placeholder="MM/dd/YYYY" class="form-control pull-right">
        <div class="input-group-append">
          <span *ngIf="!hideIcon" class="input-group-text d-none d-md-block">
            <i class="fa fa-calendar"></i>
          </span>
          <ng-content select="'.input-group-append-more'"></ng-content>
        </div>
      </div>
    </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppWeekControlComponent),
      multi: true
    }
  ]
})
export class AppWeekControlComponent implements AfterViewInit, ControlValueAccessor {

  @Input() id: string = this.guid.new();
  @Input() label = '';
  @Input() isColon = true;
  @Input() name = '';
  @Input() formatDate = 'mm/dd/yyyy';
  @Input() classAppend = '';
  @Input() container = 'body';
  @Input() isNullable = false;
  @Input() hideIcon = false;
  @Output() changeEvent: EventEmitter<string> = new EventEmitter<string>();
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
    if (v !== this.valueV) {
      this.valueV = v;
    }
  }

  ngAfterViewInit() {
    this.initUI();
  }

  // Placeholders for the callbacks which are later providesd

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value === this.valueV) {
      return;
    }

    this.valueV = value;
    if (this.elementRf && this.valueV) {
      this.elementRf.datepicker('update', new Date(this.valueV));
      const weekFrom = moment(this.valueV).startOf('week').format(DATETIME_FORMAT.DATE);
      this.changeEvent.emit(weekFrom);
    }
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
        format: {
          toDisplay: (date) => {
            // In my case, week begin on Sat. +1 day to make sure Sat moved to next week (Default start from Sun)
            const weekFrom = moment(date).startOf('week');
            const weekTil = moment(date).startOf('week').add(6, 'd');
            return '(' + weekFrom.format('D/M') + '-' + weekTil.format('D/M') + ') ' + weekTil.format('MMM YYYY');
          },
          // Convert string "2017-W34 (19/8 - 25/8)" to Date object
          toValue: () => {
          }
        },
        autoclose: true,
        container: this.container
      });

      this.elementRf.datepicker().on('changeDate', (e) => {
        this.changeDate(e);
      });
    }
  }

  private changeDate(e: any) {
    this.valueV = e.date;
    const weekFrom = moment(e.date).startOf('week').format(DATETIME_FORMAT.DATE);

    this.onChangeCallback(weekFrom);
    this.changeEvent.emit(weekFrom);
  }
}
