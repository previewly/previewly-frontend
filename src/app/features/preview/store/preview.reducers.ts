import { createFeature, createReducer, on } from '@ngrx/store';

import { Status } from '../../../app.types';
import { PreviewActions } from './preview.actions';
import { PreviewState } from './preview.types';

const MAX_COUNT = 10;

const initialState: PreviewState = {
  previews: [],
  isLoading: true,
};

export const previewFeature = createFeature({
  name: 'preview',
  reducer: createReducer(
    initialState,

    on(
      PreviewActions.successAddNewUrl,
      PreviewActions.errorAddNewUrl,
      (state): PreviewState => ({ ...state, isLoading: false })
    ),
    on(
      PreviewActions.addNewUrl,
      (state: PreviewState): PreviewState => ({ ...state, isLoading: true })
    ),

    on(PreviewActions.addNewUrl, (state, { url }) => ({
      ...state,
      previews: [
        ...state.previews.filter(preview => preview.url != url),
        {
          url,
          error: null,
          data: null,
          status: Status.LOADING,
        },
      ],
    })),

    on(PreviewActions.successAddNewUrl, (state, { url }): PreviewState => {
      const previews = state.previews.map(preview =>
        preview.url == url.url ? url : preview
      );
      return {
        ...state,
        previews:
          previews.length > MAX_COUNT
            ? previews.slice(previews.length - MAX_COUNT)
            : previews,
      };
    }),
    on(
      PreviewActions.removePreview,
      (state, { url }): PreviewState => ({
        ...state,
        previews: state.previews.filter(preview => preview.url != url),
      })
    )
  ),
});
