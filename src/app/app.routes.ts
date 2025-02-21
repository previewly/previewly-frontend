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
    path: 'legal',
    loadChildren: () =>
      import('./features/legal/legal.routes').then(l => l.routes),
  },
  {
    path: 'upload',
    loadComponent: () =>
      import('./features/upload-page/upload-page.component').then(
        u => u.UploadPageComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/404/404-page.component').then(
        f => f.NotFoundPageComponent
      ),
  },
];
