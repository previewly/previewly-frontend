import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { interval, map } from 'rxjs';
import { CodeContainerComponent } from '../../code-container/code-container.component';
import { InputUrlComponent } from '../../input-url/input-url.component';
import { sharedFeature } from '../../shared/store/shared/shared.reducers';
import { SharedPreviewContainerComponent } from '../../shared/ui/preview-container/preview-container.component';
import { ViewPreviewItem } from '../preview/preview-item/preview-item.types';
import { PreviewActions } from '../preview/store/preview.actions';
import { previewFeature } from '../preview/store/preview.reducers';

@Component({
  selector: 'app-index-page',
  standalone: true,
  imports: [
    CommonModule,
    InputUrlComponent,
    SharedPreviewContainerComponent,
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
}
