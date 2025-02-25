import { Component, input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
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
    }),
  ],
})
export class PreviewInfoComponent {
  info = input.required<ViewPreviewInfo>();
}
