import { inject } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import {
  catchError,
  exhaustMap,
  map,
  of,
  switchMap,
  tap,
  timer,
  toArray,
  concat,
} from 'rxjs';

import { ApiClient } from '../../api/graphql';
import { StoreDispatchEffect, StoreUnDispatchEffect } from '../../app.types';
import { StoragePreviewService } from '../../service/storage-preview.service';
import { PreviewActions } from './preview.actions';
import { previewFeature } from './previewFeature';
import { PreviewItem } from './preview.types';
import { Observable } from '@apollo/client/utilities';

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
            urls: [
              {
                url: data.url,
                status: data.status,
                updateAttempts: 0,
                data: { preview: data.preview.image },
                error: null,
              },
            ],
          })
        : PreviewActions.emptyTokenOnAddingNewUrl()
    )
  );

const addUrlToStorage = (
  actions$ = inject(Actions),
  storage = inject(StoragePreviewService)
) =>
  actions$.pipe(
    ofType(PreviewActions.successAddNewUrl),
    tap(({ urls }) => urls.forEach(url => storage.addUrl(url.url.toString())))
  );

const addUrlsFromLocalStorage = (
  actions$ = inject(Actions),
  storage = inject(StoragePreviewService)
) =>
  actions$.pipe(
    ofType(PreviewActions.applyTokenFromLocalStorage),
    map(() =>
      PreviewActions.addUrlsFromLocalStorage({
        urls: Object.keys(storage.readState().urls)
          .map(url => {
            try {
              return { url: url, urlObject: new URL(url) };
            } catch {
              return { url: url, urlObject: null };
            }
          })
          .map(({ url, urlObject }): PreviewItem => {
            if (urlObject) {
              return {
                url: url?.toString(),
                urlObject: urlObject,
                status: 'pending',
                updateAttempts: 0,
                data: null,
                error: null,
              };
            } else {
              return {
                url: url,
                status: 'error',
                updateAttempts: 0,
                data: null,
                error: 'Wrong URL',
              };
            }
          }),
      })
    )
  );
const updatePreviews = (
  actions$ = inject(Actions),
  store = inject(Store),
  api = inject(ApiClient)
) => {
  return actions$.pipe(
    ofType(PreviewActions.updatePreviews),
    concatLatestFrom(() => store.select(previewFeature.selectToken)),
    map(([{ urls }, token]) => {
      if (token) {
        return { urls, token };
      } else {
        throw Error('No token');
      }
    }),
    switchMap(action =>
      concat(
        ...action.urls.map((url: PreviewItem) =>
          api.getPreview({ token: action.token, url: url.url }).pipe(
            map(result => result.data.preview),
            map((preview): PreviewItem => {
              let returnPreview: PreviewItem = {
                url: url.url,
                updateAttempts: url.updateAttempts,
                error: url.error,
                status: preview?.status || url.status,
                data: null,
              };
              if (preview) {
                returnPreview = {
                  ...returnPreview,
                  data: {
                    ...url.data,
                    preview: preview.image,
                  },
                };
              } else {
                returnPreview = { ...returnPreview, error: 'No preview' };
              }

              return returnPreview;
            })
          )
        )
      ).pipe(toArray())
    ),
    map(urls => PreviewActions.successUpdatePreviews({ urls: urls }))
  );
};
export const previewEffects = {
  initState: createEffect(initState, StoreDispatchEffect),

  checkSavedToken: createEffect(checkSavedToken, StoreDispatchEffect),
  createNewToke: createEffect(createNewToken, StoreDispatchEffect),
  successCreateToken: createEffect(successCreateToken, StoreUnDispatchEffect),
  addUrl: createEffect(addUrl, StoreDispatchEffect),
  addUrlToStorage: createEffect(addUrlToStorage, StoreUnDispatchEffect),
  addUrlsFromLocalStorage: createEffect(
    addUrlsFromLocalStorage,
    StoreDispatchEffect
  ),

  updatePreviews: createEffect(updatePreviews, StoreDispatchEffect),
};
