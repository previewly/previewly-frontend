import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { TokenActions } from '../../../features/token/store/token.actions';
import { tokenFeature } from '../../../features/token/store/token.reducers';
import { SharedState } from './shared.types';

const initialState: SharedState = { isLoading: true };
export const sharedFeature = createFeature({
  name: 'shared',
  reducer: createReducer(
    initialState,
    on(
      TokenActions.setToken,
      TokenActions.cannotExposeToken,
      (state): SharedState => ({
        ...state,
        isLoading: false,
      })
    )
  ),
  extraSelectors: ({ selectIsLoading }) => ({
    isLoading: createSelector(selectIsLoading, isLoading => isLoading),
    selectToken: createSelector(tokenFeature.selectToken, token => token),
  }),
});
