import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  Signal,
  signal,
} from '@angular/core';

import { Status } from '../../../../app.types';
import { SubTitleComponent } from '../../../../shared/ui/content/title/sub-title.component';
import {
  ModalComponent,
  ModalEventInput,
  ModalEventOutput,
} from '../../modal/modal.component';
import { PreviewInfoComponent } from '../../preview-info/preview-info.component';
import { PreviewItemComponent } from '../../preview-item/preview-item.component';
import {
  createErrorPreviewItem,
  createLoadedPreviewItem,
  ViewPreviewData,
  ViewPreviewItem,
} from '../../preview-item/preview-item.types';
import { PreviewItem, ViewPreviewInfo } from '../../store/preview.types';

@Component({
  selector: 'app-shared-preview-container',
  standalone: true,
  templateUrl: './preview-container.component.html',
  styleUrls: ['./preview-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SubTitleComponent,
    PreviewItemComponent,
    ModalComponent,
    PreviewInfoComponent,
  ],
})
export class PreviewContainerComponent {
  token = input.required<string | undefined>();
  previews = input.required<PreviewItem[]>();

  removePreview = output<ViewPreviewItem>();

  views: Signal<ViewPreviewItem[]> = computed(() =>
    this.previews()
      .map((preview): ViewPreviewItem => {
        switch (preview.status) {
          case Status.LOADING:
            return createLoadedPreviewItem(this.createData(preview));
          case Status.ERROR:
            return createErrorPreviewItem(
              preview.error || undefined,
              this.createData(preview)
            );
          case Status.SUCCESS:
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
  );

  modalInEvent = signal<ModalEventInput>(ModalEventInput.close);
  previewInfo = signal<ViewPreviewInfo | undefined>(undefined);

  openStat(previewItem: ViewPreviewItem) {
    const previewInfo = this.createPreviewInfo(previewItem);
    if (previewInfo) {
      this.previewInfo.set(previewInfo);
      this.modalInEvent.set(ModalEventInput.open);
    }
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
      id: preview.data?.id,
      url: preview.url,
      title: preview.data?.title,
      shortUrl: this.createURL(preview.url)?.hostname || '',
      preview:
        preview.data?.preview.small && preview.data?.preview.window
          ? {
              item: preview.data?.preview.small,
              window: preview.data.preview.window,
              original: preview.data.preview.original,
            }
          : null,
      imageId: preview.data?.imageId,
    };
  }

  private createPreviewInfo(
    previewItem: ViewPreviewItem
  ): ViewPreviewInfo | null {
    return previewItem.data?.id &&
      previewItem.data.imageId &&
      previewItem.data.preview
      ? {
          id: previewItem.data?.id,
          url: previewItem.data.url,
          title: previewItem.data.title || previewItem.data.shortUrl,
          image: {
            id: previewItem.data.imageId,
            originalUrl: previewItem.data.preview?.original,
            thumbnailUrl: previewItem.data.preview?.window,
          },
        }
      : null;
  }
}
