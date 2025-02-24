import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  phosphorCloudWarningDuotone,
  phosphorTrashSimpleDuotone,
} from '@ng-icons/phosphor-icons/duotone';

import { ViewPreviewItem } from './preview-item.types';

@Component({
  selector: 'app-preview-item',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './preview-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({ phosphorCloudWarningDuotone, phosphorTrashSimpleDuotone }),
  ],
})
export class PreviewItemComponent {
  preview = input.required<ViewPreviewItem>();
  openStat = output();
  removePreview = output();

  click() {
    if (this.preview().status === 'success') {
      this.openStat.emit();
    }
  }

  removeClick() {
    this.removePreview.emit();
  }
}
