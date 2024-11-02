import { Routes } from '@angular/router';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { UploadPageComponent } from './pages/upload-page/upload-page.component';

export const routes: Routes = [
  { path: '', component: IndexPageComponent },
  { path: 'upload', component: UploadPageComponent },
];
