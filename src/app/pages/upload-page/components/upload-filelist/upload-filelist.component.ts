import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  phosphorCheckCircleDuotone,
  phosphorImagesDuotone,
} from '@ng-icons/phosphor-icons/duotone';
import { phosphorXCircle } from '@ng-icons/phosphor-icons/regular';
import { FileItem } from '../../../../store/upload/upload.types';

@Component({
  selector: 'app-upload-filelist',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './upload-filelist.component.html',
  styleUrls: ['./upload-filelist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      phosphorImagesDuotone,
      phosphorCheckCircleDuotone,
      phosphorXCircle,
    }),
  ],
})
export class UploadFilelistComponent {
  files = input<FileItem[]>([]);
  error = input<string | undefined>();

  isFileLoading(file: FileItem) {
    return file.status === 'loading';
  }

  isSuccess(file: FileItem) {
    return file.status === 'success';
  }

  uploadAgain(file: FileItem) {
    console.error(file);
    throw new Error('Method not implemented.');
  }
}
