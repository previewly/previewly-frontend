import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { interval, map } from 'rxjs';
import { CodeContainerComponent } from '../../code-container/code-container.component';
import { InputUrlComponent } from '../../input-url/input-url.component';
import { PreviewContainerComponent } from '../../preview-container/preview-container.component';
import { sharedFeature } from '../../shared/store/shared/shared.reducers';
import { PreviewActions } from '../../store/preview/preview.actions';
import { previewFeature } from '../../store/preview/preview.reducers';

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
}
