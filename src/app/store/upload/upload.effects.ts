import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { ApiClient } from '../../api/graphql';
import { StoreDispatchEffect } from '../../app.types';
import { UploadActions } from './upload.actions';

const uploadFiles = (actions$ = inject(Actions), api = inject(ApiClient)) =>
  actions$.pipe(
    ofType(UploadActions.uploadImages),
    exhaustMap(({ files }) =>
      api.uploadImages({ images: files }).pipe(
        map(result => result.data?.upload),
        map(result => {
          console.log(result);
          return UploadActions.successUploadImages({ result: result || [] });
        }),
        catchError(() =>
          of(
            UploadActions.errorUploadingImages({
              error: 'Could not upload images',
              files: files.map(file => ({ uuid: file.name })),
            })
          )
        )
      )
    )
  );

export const uploadEffects = {
  uploafFiles: createEffect(uploadFiles, StoreDispatchEffect),
};
