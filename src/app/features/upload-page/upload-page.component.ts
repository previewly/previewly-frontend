import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { FeatureFlagComponent } from '../../feature-flag/feature-flag.component';
import { UploadFilelistComponent } from './components/upload-filelist/upload-filelist.component';

import { Store } from '@ngrx/store';
import { UploadActions } from '../../store/upload/upload.actions';
import { uploadFeature } from '../../store/upload/upload.reducers';
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
  private readonly store = inject(Store);

  protected readonly uploadFiles = this.store.selectSignal(
    uploadFeature.selectFiles
  );
  protected readonly uploadError = this.store.selectSignal(
    uploadFeature.selectError
  );

  protected readonly canUpload = computed(
    () =>
      this.uploadFiles().filter(file => file.status === 'loading').length == 0
  );

  selectedFiles(files: File[]) {
    this.store.dispatch(UploadActions.uploadImages({ files }));
  }
}
