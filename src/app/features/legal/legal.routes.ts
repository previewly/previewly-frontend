import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'privacy',
    loadComponent: () =>
      import('../static-page/privacy-page/privacy-page.component').then(
        p => p.PrivacyPageComponent
      ),
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('../static-page/terms-page/terms-page.component').then(
        t => t.TermsPageComponent
      ),
  },
  {
    path: 'cookie-policy',
    loadComponent: () =>
      import('../static-page/cookie-page/cookie-page.component').then(
        c => c.CookiePageComponent
      ),
  },
];
