import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/index-page/index-page.component').then(
        i => i.IndexPageComponent
      ),
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./features/static-page/terms-page/terms-page.component').then(
        t => t.TermsPageComponent
      ),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./features/static-page/privacy-page/privacy-page.component').then(
        p => p.PrivacyPageComponent
      ),
  },
  {
    path: 'upload',
    loadComponent: () =>
      import('./features/upload-page/upload-page.component').then(
        u => u.UploadPageComponent
      ),
  },
];
