import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { phosphorCloudArrowUpDuotone } from '@ng-icons/phosphor-icons/duotone';

@Component({
  selector: 'app-upload-form-header',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './upload-form-header.component.html',
  styleUrls: ['./upload-form-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ phosphorCloudArrowUpDuotone })],
})
export class UploadFormHeaderComponent {}
