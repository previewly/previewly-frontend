import { inject } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import {
  StoreDispatchEffect,
  StoreUnDispatchEffect,
} from '../../../../app.types';
import { StoragePreviewService } from '../../../../service/storage-preview.service';
import { TokenService } from '../../token.service';
import { TokenActions } from '../token.actions';

export const initEffect = {
  initEffects: createEffect(
    (
      actions$ = inject(Actions),
      storageService = inject(StoragePreviewService),
      tokenService = inject(TokenService)
    ) => {
      return actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        map(() => storageService.readState()),
        exhaustMap(state =>
          state.token && state.token !== ''
            ? tokenService.verify(state.token)
            : tokenService.create()
        ),
        map(token => TokenActions.setToken({ token })),
        catchError(error => of(TokenActions.cannotExposeToken({ error })))
      );
    },
    StoreDispatchEffect
  ),

  saveTokenToLocalStorage: createEffect(
    (
      actions$ = inject(Actions),
      storageService = inject(StoragePreviewService)
    ) => {
      return actions$.pipe(
        ofType(TokenActions.setToken),
        tap(({ token }) => storageService.saveToken(token))
      );
    },
    StoreUnDispatchEffect
  ),
};
