import { createFeature, createReducer, on } from '@ngrx/store';

import { PreviewActions } from './preview.actions';
import { PreviewData, PreviewState } from './preview.types';

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

    on(PreviewActions.successAddNewUrl, (state, { preview }) => {
      const isEqual = (previewItem: PreviewData, updated: PreviewData) =>
        previewItem.url.toString() == updated.url.toString();

      const updatedPreview: PreviewData = {
        url: preview.url,
        preview: preview.preview,
        status: preview.status,
      };

      const updatedPreviews = state.previews.map(item =>
        isEqual(item, preview) ? { ...item, ...updatedPreview } : item
      );

      return {
        ...state,
        previews: updatedPreviews.findIndex(item => isEqual(item, preview))
          ? [...updatedPreviews, updatedPreview]
          : updatedPreviews,
      };
    }),

    on(
      PreviewActions.successCreateToken,
      (state, { token }): PreviewState => ({
        ...state,
        token: token,
      })
    )
  ),
});
