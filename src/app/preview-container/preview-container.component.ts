import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  Signal,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { phosphorCloudWarningDuotone } from '@ng-icons/phosphor-icons/duotone';

import { SubTitleComponent } from '../share/content/title/sub-title.component';
import { PreviewItem } from '../store/preview/preview.types';
interface ViewPreview {
  shortUrl: string;
  href: string;
  previewAltTitle: string;
  isError: boolean;
  isLoading: boolean;
  title: string | undefined;
  description: string | undefined;
  preview: string | undefined;
}

@Component({
  selector: 'app-preview-container',
  standalone: true,
  templateUrl: './preview-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SubTitleComponent, NgIconComponent],
  viewProviders: [provideIcons({ phosphorCloudWarningDuotone })],
})
export class PreviewContainerComponent {
  token = input.required<string | undefined>();
  previews = input.required<PreviewItem[]>();

  views: Signal<ViewPreview[]> = computed(() =>
    this.previews().map((preview): ViewPreview => {
      return {
        preview: preview.data?.preview,
        title: preview.data?.title,
        description: preview.data?.description,
        shortUrl: preview.url.host,
        isError: preview.status === 'error',
        isLoading: preview.status === 'pending',
        href: preview.url.toString(),
        previewAltTitle: preview.data?.title || preview.url.toString(),
      };
    })
  );
}
