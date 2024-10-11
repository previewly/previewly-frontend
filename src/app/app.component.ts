import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { interval, map } from 'rxjs';

import { CodeContainerComponent } from './code-container/code-container.component';
import { InputUrlComponent } from './input-url/input-url.component';
import { PreviewContainerComponent } from './preview-container/preview-container.component';
import { SubTitleComponent } from './share/content/title/sub-title.component';
import { TitleComponent } from './share/content/title/title.component';
import { FooterComponent } from './share/footer/footer.component';
import { LogoComponent } from './share/logo/logo.component';
import { PreviewActions } from './store/preview/preview.actions';
import { previewFeature } from './store/preview/preview.reducers';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    TitleComponent,
    InputUrlComponent,
    PreviewContainerComponent,
    CodeContainerComponent,
    SubTitleComponent,
    LogoComponent,
    FooterComponent,
  ],
})
export class AppComponent {
  private readonly store = inject(Store);
  token = this.store.selectSignal(previewFeature.selectToken);

  userPreviews = this.store.selectSignal(previewFeature.selectPreviews);
  isLoading = this.store.selectSignal(previewFeature.selectIsLoading);

  constructor() {
    interval(1000)
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
