import { createFeature, createReducer, on } from '@ngrx/store';

import { Status } from '../../../app.types';
import { PreviewActions } from './preview.actions';
import { PreviewItem, PreviewState } from './preview.types';

const MAX_COUNT = 10;

const mergePreview = (
  statePreviews: PreviewItem[],
  updated: PreviewItem[]
): PreviewItem[] => {
  const mergedMap = new Map();
  [...statePreviews, ...updated].forEach(preview => {
    mergedMap.set(preview.url, preview);
  });

  const merged = Array.from(mergedMap.values());
  return merged.length > MAX_COUNT
    ? merged.slice(merged.length - MAX_COUNT)
    : merged;
};
const initialState: PreviewState = {
  previews: [],
  urls: [],
  isLoading: true,
};

export const previewFeature = createFeature({
  name: 'preview',
  reducer: createReducer(
    initialState,

    on(
      PreviewActions.successAddNewUrls,
      PreviewActions.errorAddNewUrls,
      (state): PreviewState => ({ ...state, isLoading: false })
    ),
    on(
      PreviewActions.addNewUrls,
      (state: PreviewState): PreviewState => ({ ...state, isLoading: true })
    ),

    on(
      PreviewActions.addNewUrls,
      PreviewActions.updatePreviewsAfterInit,
      (state, { urls }): PreviewState => ({
        ...state,
        urls: [...state.urls, ...urls],
      })
    ),

    on(
      PreviewActions.addNewUrls,
      PreviewActions.updatePreviewsAfterInit,
      (state, { urls }): PreviewState => ({
        ...state,
        previews: mergePreview(
          state.previews,
          urls.map(url => ({
            url,
            data: null,
            status: Status.LOADING,
            error: null,
          }))
        ),
      })
    ),

    on(
      PreviewActions.successAddNewUrls,
      (state, { urls }): PreviewState => ({
        ...state,
        previews: mergePreview(state.previews, urls),
      })
    ),

    on(
      PreviewActions.removePreview,
      (state, { url }): PreviewState => ({
        ...state,
        urls: state.urls.filter(u => u != url),
        previews: state.previews.filter(preview => preview.url != url),
      })
    )
  ),
});
