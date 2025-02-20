import { createFeature, createReducer, on } from '@ngrx/store';
import { TokenActions } from './token.actions';
import { TokenState } from './token.types';

const initialState: TokenState = { token: '' };
export const tokenFeature = createFeature({
  name: 'token',
  reducer: createReducer(
    initialState,
    on(
      TokenActions.setToken,
      (state, { token }): TokenState => ({
        ...state,
        token,
      })
    )
  ),
});
