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
import { SharedActions } from '../../../../shared/store/shared/shared.actions';
import { TokenService } from '../../token.service';
import { TokenStorageService } from '../../tokenStorage.service';
import { TokenActions } from '../token.actions';

export const initEffect = {
  initEffects: createEffect(
    (
      actions$ = inject(Actions),
      tokenService = inject(TokenService),
      tokenStorageService = inject(TokenStorageService)
    ) => {
      return actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        map(() => tokenStorageService.getToken()),
        exhaustMap(token =>
          token && token !== ''
            ? tokenService.verify(token)
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
      tokenStorageService = inject(TokenStorageService)
    ) => {
      return actions$.pipe(
        ofType(TokenActions.setToken),
        tap(({ token }) => tokenStorageService.saveToken(token))
      );
    },
    StoreUnDispatchEffect
  ),

  reCreateToken: createEffect(
    (actions$ = inject(Actions), tokenService = inject(TokenService)) => {
      return actions$.pipe(
        ofType(SharedActions.retryCreateToken),
        exhaustMap(() => tokenService.create()),
        map(token => TokenActions.setToken({ token })),
        catchError(error => of(TokenActions.cannotExposeToken({ error })))
      );
    },
    StoreDispatchEffect
  ),
};
