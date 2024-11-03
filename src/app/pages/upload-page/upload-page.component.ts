import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FeatureFlagComponent } from '../../feature-flag/feature-flag.component';
import { UploadFilelistComponent } from './components/upload-filelist/upload-filelist.component';
import { FileItem } from './components/upload-filelist/upload-filelist.types';
import { UploadFormHeaderComponent } from './components/upload-form-header/upload-form-header.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [
    CommonModule,
    FeatureFlagComponent,
    UploadFormComponent,
    UploadFormHeaderComponent,
    UploadFilelistComponent,
  ],
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadPageComponent {
  protected readonly uploadFiles = signal<FileItem[]>([]);

  selectedFiles(files: File[]) {
    this.uploadFiles.set(
      files.map(file => ({
        name: file.name,
        isLoading: true,
      }))
    );
  }
}
