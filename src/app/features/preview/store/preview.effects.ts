import { Actions, createEffect, ofType } from '@ngrx/effects';

import { inject } from '@angular/core';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { StoreDispatchEffect } from '../../../app.types';
import { sharedFeature } from '../../../shared/store/shared/shared.reducers';
import { PreviewService } from '../preview.service';
import { PreviewActions } from './preview.actions';

export const previewEffects = {
  addUrl: createEffect(
    (
      actions$ = inject(Actions),
      store = inject(Store),
      previewService = inject(PreviewService)
    ) => {
      return actions$.pipe(
        ofType(PreviewActions.addNewUrl),
        concatLatestFrom(() => store.select(sharedFeature.selectToken)),
        exhaustMap(([{ url }, token]) =>
          previewService
            .getPreview(url, token)
            .pipe(map(result => ({ ...result, url })))
        ),
        map(result => {
          return PreviewActions.successAddNewUrl({
            url: {
              url: result.url,
              data: result.data
                ? {
                    id: result.data?.id,
                    title: result.data.title || undefined,
                    preview: {
                      small: result.data.imageSmall,
                      window: result.data.imageWindow,
                      original: result.data.image,
                    },
                  }
                : null,
              error: result.error?.message,
              status: result.status,
            },
          });
        }),
        catchError(error => of(PreviewActions.errorAddNewUrl(error)))
      );
    },
    StoreDispatchEffect
  ),
};
