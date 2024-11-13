import { Routes } from '@angular/router';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { PrivacyPageComponent } from './pages/privacy-page/privacy-page.component';
import { UploadPageComponent } from './pages/upload-page/upload-page.component';

export const routes: Routes = [
  { path: '', component: IndexPageComponent },
  { path: 'privacy', component: PrivacyPageComponent },
  { path: 'upload', component: UploadPageComponent },
];
