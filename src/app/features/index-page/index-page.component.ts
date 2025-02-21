import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { interval, map } from 'rxjs';
import { SharedActions } from '../../shared/store/shared/shared.actions';
import { sharedFeature } from '../../shared/store/shared/shared.reducers';
import { CodeContainerComponent } from '../integration/shared/code-container/code-container.component';
import { ViewPreviewItem } from '../preview/preview-item/preview-item.types';
import { PreviewContainerComponent } from '../preview/shared/preview-container/preview-container.component';
import { PreviewActions } from '../preview/store/preview.actions';
import { previewFeature } from '../preview/store/preview.reducers';
import { InputUrlComponent } from './input-url/input-url.component';

@Component({
  selector: 'app-index-page',
  standalone: true,
  imports: [
    CommonModule,
    InputUrlComponent,
    PreviewContainerComponent,
    CodeContainerComponent,
  ],
  templateUrl: './index-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexPageComponent {
  private readonly store = inject(Store);
  protected readonly token = this.store.selectSignal(sharedFeature.selectToken);

  protected readonly userPreviews = this.store.selectSignal(
    previewFeature.selectPreviews
  );
  protected readonly isLoading = this.store.selectSignal(
    sharedFeature.isLoading
  );
  pageError = this.store.selectSignal(sharedFeature.selectError);

  constructor() {
    interval(3000)
      .pipe(
        takeUntilDestroyed(),
        concatLatestFrom(() =>
          this.store.select(previewFeature.selectShouldUpdate)
        ),
        map(([, shouldUpdate]) => shouldUpdate)
      )
      .subscribe(urls => {
        if (urls.length > 0) {
          this.store.dispatch(PreviewActions.updatePreviews({ urls: urls }));
        }
      });
  }

  addUrl(url: string) {
    this.store.dispatch(PreviewActions.addNewUrl({ url }));
  }

  removePreview(preview: ViewPreviewItem) {
    if (preview.data?.url) {
      this.store.dispatch(
        PreviewActions.removePreview({ url: preview.data.url })
      );
    }
  }

  retryExposeToken() {
    this.store.dispatch(SharedActions.retryCreateToken());
  }
}
