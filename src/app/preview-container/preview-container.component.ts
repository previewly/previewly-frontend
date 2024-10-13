import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  Signal,
  signal,
} from '@angular/core';

import { SubTitleComponent } from '../share/content/title/sub-title.component';
import { PreviewItem } from '../store/preview/preview.types';
import {
  ModalComponent,
  ModalEventInput,
  ModalEventOutput,
} from './modal/modal.component';
import { PreviewItemComponent } from './preview-item/preview-item.component';
import {
  createDumpPreviewItem,
  createErrorPreviewItem,
  createLoadedPreviewItem,
  ViewPreviewData,
  ViewPreviewItem,
} from './preview-item/preview-item.types';

@Component({
  selector: 'app-preview-container',
  standalone: true,
  templateUrl: './preview-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SubTitleComponent,
    PreviewItemComponent,
    ModalComponent,
  ],
})
export class PreviewContainerComponent {
  token = input.required<string | undefined>();
  previews = input.required<PreviewItem[]>();

  views: Signal<ViewPreviewItem[]> = computed(() =>
    this.previews().length > 0
      ? this.previews()
          .map((preview): ViewPreviewItem => {
            switch (preview.status) {
              case 'pending':
                return createLoadedPreviewItem(this.createData(preview));
              case 'error':
                return createErrorPreviewItem(
                  preview.error || undefined,
                  this.createData(preview)
                );
              case 'success':
                return {
                  status: 'success',
                  error: undefined,
                  data: this.createData(preview),
                };
              default:
                return createErrorPreviewItem(
                  'something went wrong',
                  this.createData(preview)
                );
            }
          })
          .reverse()
      : this.createDumpPreviews()
  );

  modalInEvent = signal<ModalEventInput>(ModalEventInput.close);
  showPreview = signal<ViewPreviewItem | undefined>(undefined);

  openStat(previewItem: ViewPreviewItem) {
    this.showPreview.set(previewItem);
    this.modalInEvent.set(ModalEventInput.open);
  }

  modalOutEvent($event: ModalEventOutput) {
    if ($event === ModalEventOutput.onClose) {
      this.modalInEvent.set(ModalEventInput.close);
    }
  }

  private createURL(url: string): URL | undefined {
    try {
      return new URL(url);
    } catch {
      return undefined;
    }
  }

  private createData(preview: PreviewItem): ViewPreviewData {
    return {
      url: preview.url,
      shortUrl: this.createURL(preview.url)?.hostname,
      preview: preview.data?.preview,
      previewAltTitle: preview.data?.title || preview.url.toString(),
    };
  }

  private createDumpPreviews(): ViewPreviewItem[] {
    return [
      createDumpPreviewItem(),
      createDumpPreviewItem(),
      createDumpPreviewItem(),
    ];
  }
}
