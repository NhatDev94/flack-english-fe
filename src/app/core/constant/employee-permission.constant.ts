import {RouterPermissionMappingModel} from '../../data/data-components/router-permission-mapping.model';

export const EMPLOYEE_PERMISSION_CODE = {
  COMPANY_MANAGEMENT: 'COMPANY_MANAGEMENT'
};

export const ROUTER_EMPLOYEE_PERMISSION_MAPPER = [
  new RouterPermissionMappingModel(
    {
      routerLink: '/',
      matchUrl: '',
      name: '',
      icon: '',
      permissions: [],
      sort: 1,
      isMenu: false
    }),
  new RouterPermissionMappingModel(
    {
      routerLink: '/dashboard',
      matchUrl: '',
      name: '',
      icon: '',
      permissions: [],
      sort: 1,
      isMenu: false
    }),
  new RouterPermissionMappingModel(
    {
      routerLink: '/company',
      matchUrl: '',
      name: 'Công ty',
      icon: 'fas fa-money-check-alt',
      permissions: [
        EMPLOYEE_PERMISSION_CODE.COMPANY_MANAGEMENT
      ],
      sort: 2,
      isMenu: true
    }),
];
