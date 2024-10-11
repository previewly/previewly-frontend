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
import { StoragePreviewService } from '../../service/storage-preview.service';
import { PreviewActions } from './preview.actions';
import { previewFeature } from './preview.reducers';

const shouldUpdatePreview = (status: string, attempts: number) =>
  status === 'pending' && attempts < 10;

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

const checkSavedToken = (actions$ = inject(Actions), api = inject(ApiClient)) =>
  actions$.pipe(
    ofType(PreviewActions.checkLocalStorageToken),
    exhaustMap(({ token }) =>
      api.verifyToken({ token: token }).pipe(
        map(result => result.data?.isValid || false),
        map(isValid =>
          isValid
            ? PreviewActions.applyTokenFromLocalStorage({ token: token })
            : PreviewActions.createNewToken()
        )
      )
    )
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
              if (!preview) {
                throw Error('No preview');
              }
              return {
                url: url,
                status: preview.status,
                preview: {
                  id: preview.id,
                  image: preview.image,
                },
              };
            })
          )
        : of(undefined)
    ),
    map(data =>
      data?.preview
        ? PreviewActions.successAddNewUrl({
            url: data.url,
            status: data.status,
            attempts: 0,
            preview: { preview: data.preview.image },
          })
        : PreviewActions.emptyTokenOnAddingNewUrl()
    )
  );

const startTimerForUpdatePreviewAfterAdding = (actions$ = inject(Actions)) =>
  actions$.pipe(
    ofType(
      PreviewActions.successAddNewUrl,
      PreviewActions.successUpdatePreview
    ),
    map(action =>
      shouldUpdatePreview(action.status, action.attempts) ? action : null
    ),
    exhaustMap(action =>
      timer(3000).pipe(
        map(() =>
          action
            ? PreviewActions.updatePreview({
                url: action.url,
                attempt: action.attempts + 1,
              })
            : PreviewActions.shouldNotUpdatePreview()
        )
      )
    )
  );

const updatePreview = (
  actions$ = inject(Actions),
  store = inject(Store),
  api = inject(ApiClient)
) =>
  actions$.pipe(
    ofType(PreviewActions.updatePreview),
    concatLatestFrom(() => store.select(previewFeature.selectToken)),
    map(([{ url, attempt }, token]) => {
      if (token) {
        return { url, attempt, token };
      } else {
        throw Error('No token');
      }
    }),
    exhaustMap(({ url, attempt, token }) =>
      api.getPreview({ url: url, token: token }).pipe(
        map(result => result.data.preview),
        map(preview => {
          if (preview) {
            return {
              id: preview.id,
              url: new URL(url),
              status: preview.status.toString(),
              image: preview.image,
            };
          } else {
            throw Error('No preview');
          }
        }),
        map(preview =>
          PreviewActions.successUpdatePreview({
            url,
            status: preview.status,
            attempts: attempt,
            preview: {
              preview: preview.image,
            },
          })
        )
      )
    ),
    catchError(err => of(PreviewActions.errorUpdatePreview({ error: err })))
  );

const addUrlToStorage = (
  actions$ = inject(Actions),
  storage = inject(StoragePreviewService)
) =>
  actions$.pipe(
    ofType(PreviewActions.successAddNewUrl),
    tap(({ url }) => storage.addUrl(url))
  );

const addLocalStorageUrls = (
  actions$ = inject(Actions),
  storage = inject(StoragePreviewService),
  store = inject(Store)
) =>
  actions$.pipe(
    ofType(PreviewActions.applyTokenFromLocalStorage),
    tap(() => {
      const urls: Record<string, string> = storage.readState().urls;
      let key: keyof typeof urls;
      for (key in urls) {
        console.log(urls[key]);
        store.dispatch(PreviewActions.addNewUrl({ url: urls[key] }));
      }
    })
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
  addUrlToStorage: createEffect(addUrlToStorage, StoreUnDispatchEffect),
  updatePreview: createEffect(updatePreview, StoreDispatchEffect),
  addLocalStorageUrls: createEffect(addLocalStorageUrls, StoreUnDispatchEffect),
};
