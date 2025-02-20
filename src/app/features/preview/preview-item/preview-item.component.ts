import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
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

  protected shouldRemove = signal(false);

  click() {
    if (this.preview().status === 'success') {
      this.openStat.emit();
    }
  }

  removeClick() {
    this.shouldRemove.set(true);
  }

  animationEnd() {
    if (this.shouldRemove()) {
      this.removePreview.emit();
    }
  }
}
