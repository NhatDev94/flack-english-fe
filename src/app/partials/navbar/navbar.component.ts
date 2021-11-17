import {AfterViewInit, Component} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements AfterViewInit {
  ngAfterViewInit() {
    $('input[data-bootstrap-switch]').each(function() {
      $(this).bootstrapSwitch('state', $(this).prop('checked'));
    });
  }
}
