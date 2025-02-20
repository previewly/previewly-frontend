import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { TokenActions } from '../../../features/token/store/token.actions';
import { tokenFeature } from '../../../features/token/store/token.reducers';
import { SharedActions } from './shared.actions';
import { CookieCategory, SharedState } from './shared.types';

const initialState: SharedState = { isLoading: true, cookie: [] };
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
    ),

    on(SharedActions.dispatchCookieConsent, (state, { cookie }) => ({
      ...state,
      cookie: (cookie.categories || [])
        .map(category => {
          if (category === CookieCategory.ANALYTICS.toLowerCase()) {
            return CookieCategory.ANALYTICS;
          }
          if (category === CookieCategory.NECESSARY.toLowerCase()) {
            return CookieCategory.NECESSARY;
          }
          return null;
        })
        .filter(Boolean) as CookieCategory[],
    }))
  ),
  extraSelectors: ({ selectIsLoading }) => ({
    isLoading: createSelector(selectIsLoading, isLoading => isLoading),
    selectToken: createSelector(tokenFeature.selectToken, token => token),
  }),
});
