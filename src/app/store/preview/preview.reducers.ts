import { createFeature, createReducer, on } from '@ngrx/store';

import { PreviewActions } from './preview.actions';
import { PreviewItem, PreviewState } from './preview.types';

const initialState: PreviewState = {
  token: undefined,
  previews: [],
  isLoading: true,
};

export const previewFeature = createFeature({
  name: 'preview',
  reducer: createReducer(
    initialState,
    on(
      PreviewActions.successCreateToken,
      PreviewActions.emptyToken,
      PreviewActions.applyInitialStateFromLocalStorage,
      PreviewActions.successAddNewUrl,
      (state): PreviewState => ({ ...state, isLoading: false })
    ),

    on(
      PreviewActions.createNewToken,
      PreviewActions.addNewUrl,
      (state: PreviewState): PreviewState => ({ ...state, isLoading: true })
    ),

    on(
      PreviewActions.applyInitialStateFromLocalStorage,
      (_, { state }): PreviewState => ({
        ...state,
        previews: [],
        isLoading: false,
      })
    ),

    on(
      PreviewActions.successAddNewUrl,
      PreviewActions.successUpdatePreview,
      (state, { url, status, attempts, preview }) => {
        const isEqual = (previewItem: PreviewItem, url: string) =>
          previewItem.url.toString() == url;

        const updatedPreview: PreviewItem = {
          url: new URL(url),
          data: {
            ...preview,
          },
          updateAttempts: attempts,
          status: status,
          error: null,
        };

        const updatedPreviews = state.previews.map(item =>
          isEqual(item, url) ? { ...item, ...updatedPreview } : item
        );

        return {
          ...state,
          previews: updatedPreviews.findIndex(item => isEqual(item, url))
            ? [...updatedPreviews, updatedPreview]
            : updatedPreviews,
        };
      }
    ),

    on(
      PreviewActions.successCreateToken,
      (state, { token }): PreviewState => ({
        ...state,
        token: token,
      })
    )
  ),
});
