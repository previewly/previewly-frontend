import { inject } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, tap, timer } from 'rxjs';

import { ApiClient } from '../../api/graphql';
import { StoreDispatchEffect, StoreUnDispatchEffect } from '../../app.types';
import { PreviewActions } from './preview.actions';
import { previewFeature } from './preview.reducers';
import { Preview } from './preview.types';
import { StoragePreviewService } from './storage-preview.service';

const initState = (
  actions$ = inject(Actions),
  storageService = inject(StoragePreviewService)
) =>
  actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => storageService.readState()),
    map(state =>
      state.token
        ? PreviewActions.checkLocalStorageToken({ token: state.token })
        : PreviewActions.createNewToken()
    )
  );

const checkSavedToken = (
  actions$ = inject(Actions),
  api = inject(ApiClient),
  storageService = inject(StoragePreviewService)
) =>
  actions$.pipe(
    ofType(PreviewActions.checkLocalStorageToken),
    exhaustMap(({ token }) => {
      return api.verifyToken({ token: token }).pipe(
        map(result => result.data?.isValid || false),
        map(isValid =>
          isValid
            ? PreviewActions.applyInitialStateFromLocalStorage({
                state: { ...storageService.readState(), token: token },
              })
            : PreviewActions.createNewToken()
        )
      );
    })
  );

const createNewToken = (actions$ = inject(Actions), api = inject(ApiClient)) =>
  actions$.pipe(
    ofType(PreviewActions.createNewToken),
    exhaustMap(() =>
      api.createToken().pipe(
        map(result => result.data?.token),
        map(token =>
          token
            ? PreviewActions.successCreateToken({ token })
            : PreviewActions.emptyToken()
        ),
        catchError(
          () => of() //TODO add exception
        )
      )
    )
  );

const successCreateToken = (
  actions$ = inject(Actions),
  storageService = inject(StoragePreviewService)
) =>
  actions$.pipe(
    ofType(PreviewActions.successCreateToken),
    tap(({ token }) => storageService.initState(token))
  );

const addUrl = (
  actions$ = inject(Actions),
  api = inject(ApiClient),
  store = inject(Store)
) =>
  actions$.pipe(
    ofType(PreviewActions.addNewUrl),
    concatLatestFrom(() => store.select(previewFeature.selectToken)),
    exhaustMap(([{ url }, token]) =>
      token
        ? api.addUrl({ token: token, url: url }).pipe(
            map(result => result.data?.preview),
            map(preview => {
              let previewData: Preview | undefined = undefined;
              if (preview) {
                previewData = {
                  status: preview.status,
                  url: new URL(url),
                };
                if (preview.image) {
                  previewData.preview = preview.image;
                }
              }
              return previewData;
            })
          )
        : of(undefined)
    ),
    map(preview =>
      preview
        ? PreviewActions.successAddNewUrl({ preview })
        : PreviewActions.emptyTokenOnAddingNewUrl()
    )
  );

const startTimerForUpdatePreviewAfterAdding = (actions$ = inject(Actions)) =>
  actions$.pipe(
    ofType(
      PreviewActions.successAddNewUrl,
      PreviewActions.startTimerForUpdatePreview
    ),
    map(({ preview }) => (preview.status === 'pending' ? preview : null)),
    exhaustMap(preview =>
      timer(3000).pipe(
        map(() =>
          preview
            ? PreviewActions.updateImage({ preview: preview })
            : PreviewActions.shouldNotUpdateImagePreview()
        )
      )
    )
  );

export const previewEffects = {
  initState: createEffect(initState, StoreDispatchEffect),

  checkSavedToken: createEffect(checkSavedToken, StoreDispatchEffect),
  createNewToke: createEffect(createNewToken, StoreDispatchEffect),
  successCreateToken: createEffect(successCreateToken, StoreUnDispatchEffect),

  addUrl: createEffect(addUrl, StoreDispatchEffect),

  successAddUrl: createEffect(
    startTimerForUpdatePreviewAfterAdding,
    StoreDispatchEffect
  ),
};
