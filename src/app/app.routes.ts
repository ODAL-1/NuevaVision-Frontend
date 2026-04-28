import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./pages/orders/orders.component').then((m) => m.OrdersComponent),
    canActivate: [authGuard],
  },
  {
    path: 'inventory',
    loadComponent: () =>
      import('./pages/inventory/inventory.component').then(
        (m) => m.InventoryComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'billing',
    loadComponent: () =>
      import('./pages/billing/billing.component').then(
        (m) => m.BillingComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'statistics',
    loadComponent: () =>
      import('./pages/statistics/statistics.component').then(
        (m) => m.StatisticsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'accounting',
    loadComponent: () =>
      import('./pages/accounting/accounting.component').then(
        (m) => m.AccountingComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/authentication/authentication.component').then(
        (m) => m.AuthenticationComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];