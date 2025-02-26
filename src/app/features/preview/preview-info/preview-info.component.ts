import { Component, input, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  phosphorArrowCircleDownDuotone,
  phosphorArrowCircleUpDuotone,
} from '@ng-icons/phosphor-icons/duotone';
import {
  phosphorBookmark,
  phosphorImageSquare,
  phosphorKey,
  phosphorLinkSimpleHorizontal,
} from '@ng-icons/phosphor-icons/regular';
import { ViewPreviewInfo } from '../store/preview.types';

@Component({
  standalone: true,
  selector: 'app-preview-info',
  templateUrl: './preview-info.component.html',
  imports: [NgIconComponent],
  viewProviders: [
    provideIcons({
      phosphorLinkSimpleHorizontal,
      phosphorImageSquare,
      phosphorBookmark,
      phosphorKey,
      phosphorArrowCircleDownDuotone,
      phosphorArrowCircleUpDuotone,
    }),
  ],
})
export class PreviewInfoComponent {
  info = input.required<ViewPreviewInfo>();

  protected isMoreHidden = signal(true);

  protected toggleMore() {
    this.isMoreHidden.update(v => !v);
  }
}
