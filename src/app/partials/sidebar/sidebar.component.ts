import {Component, OnInit} from '@angular/core';
import {EMPLOYEE_PERMISSION_CODE, ROUTER_EMPLOYEE_PERMISSION_MAPPER} from '../../core/constant/employee-permission.constant';
import {CurrentUserService} from '../../core/service/software/current-user.service';
import {RouterPermissionMappingModel} from '../../data/data-components/router-permission-mapping.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public licenseGroups: RouterPermissionMappingModel[] = [];
  public employeeGroups: RouterPermissionMappingModel[] = [];

  constructor(
    private router: Router,
    private currentUserService: CurrentUserService
  ) {
  }

  ngOnInit(): void {
    this.collectData();
  }

  public isActive(): boolean {
    return this.router.url === '/' || this.router.url === '/ticket-management';
  }

  private collectData() {
    const permissions = this.currentUserService.getPermissions();
    for (const item of permissions) {
      const mapper = this.getPermissionMapping(item);
      switch (item) {
        case EMPLOYEE_PERMISSION_CODE.COMPANY_MANAGEMENT:
          this.licenseGroups = this.licenseGroups.concat(mapper);
          break;
      }
    }

    this.employeeGroups.sort(this.sortItems);
  }

  private getPermissionMapping(permissionCode: string): RouterPermissionMappingModel[] {
    const result: RouterPermissionMappingModel[] = [];
    for (const item of ROUTER_EMPLOYEE_PERMISSION_MAPPER) {
      const ind = item.permissions.findIndex(value => {
        return value === permissionCode;
      });
      if (item.isMenu && ind !== -1) {
        result.push(new RouterPermissionMappingModel(item));
      }
    }

    return result;
  }

  private sortItems(a: RouterPermissionMappingModel, b: RouterPermissionMappingModel): number {
    if (a.sort < b.sort) {
      return -1;
    }
    if (a.sort > b.sort) {
      return 1;
    }
    return 0;
  }
}
