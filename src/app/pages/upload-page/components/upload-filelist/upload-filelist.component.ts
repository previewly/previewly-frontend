import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  phosphorCheckCircleDuotone,
  phosphorImagesDuotone,
} from '@ng-icons/phosphor-icons/duotone';
import { FileItem } from './upload-filelist.types';

@Component({
  selector: 'app-upload-filelist',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './upload-filelist.component.html',
  styleUrls: ['./upload-filelist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({ phosphorImagesDuotone, phosphorCheckCircleDuotone }),
  ],
})
export class UploadFilelistComponent {
  files = input<FileItem[]>([]);
}
