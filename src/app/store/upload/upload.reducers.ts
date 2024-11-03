import { createFeature, createReducer, on } from '@ngrx/store';
import { UploadActions } from './upload.actions';
import { UploadState } from './upload.types';

const initialState: UploadState = {
  files: [],
  error: undefined,
};
export const uploadFeature = createFeature({
  name: 'upload',
  reducer: createReducer(
    initialState,

    on(UploadActions.uploadImages, (state, { files }) => ({
      ...state,
      files: files.map(file => ({ name: file.name, isLoading: true })),
    })),

    on(
      UploadActions.errorUploadingImages,
      (state, { error }): UploadState => ({
        ...state,
        error: error,
      })
    )
  ),
});
