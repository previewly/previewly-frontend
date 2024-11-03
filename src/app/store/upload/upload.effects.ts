import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { StoreDispatchEffect } from '../../app.types';
import { UploadActions } from './upload.actions';

const uploadFiles = (
  actions$ = inject(Actions),
  httpClient = inject(HttpClient)
) =>
  actions$.pipe(
    ofType(UploadActions.uploadImages),
    map(({ files }) => {
      const formData = new FormData();
      files.forEach((file: File) => {
        formData.append('files', file, file.name);
      });
      return formData;
    }),
    exhaustMap(formData =>
      httpClient.post('/upload', formData).pipe(
        map(() => {
          return UploadActions.successUploadImages({ files: [] });
        })
      )
    ),
    catchError(() =>
      of(
        UploadActions.errorUploadingImages({
          error: 'Could not upload images',
        })
      )
    )
  );

export const uploadEffects = {
  uploafFiles: createEffect(uploadFiles, StoreDispatchEffect),
};
