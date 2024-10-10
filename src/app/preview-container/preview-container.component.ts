import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  Signal,
} from '@angular/core';

import { SubTitleComponent } from '../share/content/title/sub-title.component';
import { PreviewItem } from '../store/preview/preview.types';

interface ViewPreview {
  title: string | undefined;
  description: string | undefined;
  preview: string | undefined;
  shortUrl: string;
  href: string;
  previewAltTitle: string;
}

@Component({
  selector: 'app-preview-container',
  standalone: true,
  templateUrl: './preview-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SubTitleComponent],
})
export class PreviewContainerComponent {
  token = input.required<string | undefined>();
  isLoading = input<boolean>(false);
  previews = input.required<PreviewItem[]>();

  views: Signal<ViewPreview[]> = computed(() =>
    this.previews().map((preview): ViewPreview => {
      return {
        preview: preview.data?.preview,
        title: preview.data?.title,
        description: preview.data?.description,
        shortUrl: preview.url.host,
        href: preview.url.toString(),
        previewAltTitle: preview.data?.title || preview.url.toString(),
      };
    })
  );
}
