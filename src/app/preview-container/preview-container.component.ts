import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  Signal,
} from '@angular/core';

import { SubTitleComponent } from '../share/content/title/sub-title.component';
import { PreviewData } from '../store/preview/preview.types';

type ViewPreview = PreviewData & {
  shortUrl: string;
  href: string;
  previewAltTitle: string;
};

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
  previews = input.required<PreviewData[]>();

  views: Signal<ViewPreview[]> = computed(() =>
    this.previews().map(preview => {
      return {
        ...preview,
        shortUrl: preview.url.host,
        href: preview.url.toString(),
        previewAltTitle: preview.title || preview.url.toString(),
      };
    })
  );
}
