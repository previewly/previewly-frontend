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
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { phosphorArrowCircleDownDuotone } from '@ng-icons/phosphor-icons/duotone';

import { Status } from '../../../../app.types';
import { SubTitleComponent } from '../../../../shared/ui/content/title/sub-title.component';
import {
  ModalComponent,
  ModalEventInput,
  ModalEventOutput,
} from '../../modal/modal.component';
import { PreviewItemComponent } from '../../preview-item/preview-item.component';
import {
  createErrorPreviewItem,
  createLoadedPreviewItem,
  ViewPreviewData,
  ViewPreviewItem,
} from '../../preview-item/preview-item.types';
import { PreviewItem } from '../../store/preview.types';

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
    NgIconComponent,
  ],
  viewProviders: [provideIcons({ phosphorArrowCircleDownDuotone })],
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
      preview:
        preview.data?.preview.small && preview.data?.preview.window
          ? {
              item: preview.data?.preview.small,
              window: preview.data.preview.window,
              original: preview.data.preview.original,
            }
          : null,
      previewAltTitle: preview.data?.title || preview.url.toString(),
      title: preview.data?.title,
    };
  }
}
