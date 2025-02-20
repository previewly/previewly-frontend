import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { PreviewActions } from './preview.actions';
import { PreviewItem, PreviewState } from './preview.types';

const MAX_COUNT = 10;
const MAX_ATTEMPTS = 10;

const initialState: PreviewState = {
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
  [...updateKeys].reverse().forEach(updatedUrl => {
    if (stateKeys.indexOf(updatedUrl) == -1) {
      const shouldAdd = updatePreviews.find(
        url => url.url.toString() == updatedUrl
      );
      if (shouldAdd) {
        updatedState.push(shouldAdd);
      }
    }
  });
  return updatedState.length > MAX_COUNT
    ? updatedState.slice(updatedState.length - MAX_COUNT)
    : updatedState;
};

export const previewFeature = createFeature({
  name: 'preview',
  reducer: createReducer(
    initialState,
    on(
      PreviewActions.emptyToken,
      PreviewActions.successAddNewUrl,
      (state): PreviewState => ({ ...state, isLoading: false })
    ),

    on(
      PreviewActions.addNewUrl,
      (state: PreviewState): PreviewState => ({ ...state, isLoading: true })
    ),

    on(
      PreviewActions.addUrlsFromLocalStorage,
      PreviewActions.successAddNewUrl,
      PreviewActions.successUpdatePreviews,
      (state, { urls }): PreviewState => ({
        ...state,
        previews: mergePreviews(state.previews, urls).map(url => ({
          ...url,
          updateAttempts: url.updateAttempts + 1,
        })),
      })
    ),

    on(
      PreviewActions.removePreview,
      (state, { url }): PreviewState => ({
        ...state,
        previews: state.previews.filter(preview => preview.url != url),
      })
    )
  ),
  extraSelectors: ({ selectPreviews }) => ({
    selectShouldUpdate: createSelector(selectPreviews, previews =>
      previews.filter(
        preview =>
          preview.status == 'pending' && preview.updateAttempts < MAX_ATTEMPTS
      )
    ),
  }),
});
