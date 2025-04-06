import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { ApiClient } from '../../api/graphql';
import { StoreDispatchEffect } from '../../app.types';
import { sharedFeature } from '../../shared/store/shared/shared.reducers';
import { UploadActions } from './upload.actions';

const uploadFiles = (
  actions$ = inject(Actions),
  store = inject(Store),
  api = inject(ApiClient)
) =>
  actions$.pipe(
    ofType(UploadActions.uploadImages),
    concatLatestFrom(() => store.select(sharedFeature.selectToken)),
    map(([{ files }, token]) => ({
      files: files.map(file => ({
        image: file,
        extra: 'upload page',
      })),
      token,
    })),
    exhaustMap(({ files, token }) =>
      token
        ? api.uploadImages({ images: files, token }).pipe(
            map(result => result.data?.upload),
            map(result =>
              UploadActions.successUploadImages({ result: result || [] })
            ),
            catchError(() =>
              of(
                UploadActions.errorUploadingImages({
                  error: 'Could not upload images',
                  files: files.map(file => ({ uuid: file.image.name })),
                })
              )
            )
          )
        : of(UploadActions.emptyToken())
    )
  );

export const uploadEffects = {
  uploafFiles: createEffect(uploadFiles, StoreDispatchEffect),
};
