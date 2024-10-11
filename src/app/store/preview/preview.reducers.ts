import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { PreviewActions } from './preview.actions';
import { PreviewItem, PreviewState } from './preview.types';

const initialState: PreviewState = {
  token: undefined,
  previews: [],
  isLoading: true,
};

const mergePreviews = (
  statePreviews: PreviewItem[],
  updatePreviews: PreviewItem[]
): PreviewItem[] => {
  const stateKeys = statePreviews.map(url => url.url.toString());
  const updateKeys = updatePreviews.map(url => url.url.toString());

  const updatedState = statePreviews.map(url => {
    const updateIndex = updateKeys.indexOf(url.url.toString());
    return updateIndex != -1 ? updatePreviews[updateIndex] || url : url;
  });
  updateKeys.forEach(updatedUrl => {
    if (stateKeys.indexOf(updatedUrl) == -1) {
      const shouldAdd = updatePreviews.find(
        url => url.url.toString() == updatedUrl
      );
      if (shouldAdd) {
        updatedState.push(shouldAdd);
      }
    }
  });
  return updatedState;
};

export const previewFeature = createFeature({
  name: 'preview',
  reducer: createReducer(
    initialState,
    on(
      PreviewActions.successCreateToken,
      PreviewActions.emptyToken,
      PreviewActions.applyTokenFromLocalStorage,
      PreviewActions.successAddNewUrl,
      (state): PreviewState => ({ ...state, isLoading: false })
    ),

    on(
      PreviewActions.createNewToken,
      PreviewActions.addNewUrl,
      (state: PreviewState): PreviewState => ({ ...state, isLoading: true })
    ),

    on(
      PreviewActions.applyTokenFromLocalStorage,
      (storeState, { token }): PreviewState => ({ ...storeState, token: token })
    ),

    on(
      PreviewActions.successCreateToken,
      (state, { token }): PreviewState => ({
        ...state,
        token: token,
      })
    ),
    on(
      PreviewActions.addUrlsFromLocalStorage,
      PreviewActions.successAddNewUrl,
      PreviewActions.successUpdatePreviews,
      (state, { urls }): PreviewState => ({
        ...state,
        previews: mergePreviews(state.previews, urls),
      })
    ),
    on(
      PreviewActions.updatePreviews,
      (state, { urls }): PreviewState => ({
        ...state,
        previews: state.previews.map(preview =>
          urls.findIndex(url => url.url === preview.url) != -1
            ? { ...preview, updateAttempts: preview.updateAttempts + 1 }
            : preview
        ),
      })
    )
  ),
  extraSelectors: ({ selectPreviews }) => ({
    selectShouldUpdate: createSelector(selectPreviews, previews =>
      previews.filter(
        preview => preview.status == 'pending' && preview.updateAttempts < 10
      )
    ),
  }),
});
