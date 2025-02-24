import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { StoreDispatchEffect } from '../../../app.types';
import { PreviewActions } from '../../../features/preview/store/preview.actions';
import { previewFeature } from '../../../features/preview/store/preview.reducers';
import { TokenActions } from '../../../features/token/store/token.actions';

export const sharedEffects = {
  updatePreviews: createEffect(
    (actions$ = inject(Actions), store = inject(Store)) => {
      return actions$.pipe(
        ofType(TokenActions.setToken),
        concatLatestFrom(() =>
          store
            .select(previewFeature.selectUrls)
            .pipe(map(urls => [...new Set(urls)]))
        ),
        map(([, urls]) => PreviewActions.updatePreviewsAfterInit({ urls }))
      );
    },
    StoreDispatchEffect
  ),
};
