import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { phosphorCloudWarningDuotone } from '@ng-icons/phosphor-icons/duotone';

import { ViewPreviewItem } from './preview-item.types';

@Component({
  selector: 'app-preview-item',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './preview-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ phosphorCloudWarningDuotone })],
})
export class PreviewItemComponent {
  preview = input.required<ViewPreviewItem>();
}
