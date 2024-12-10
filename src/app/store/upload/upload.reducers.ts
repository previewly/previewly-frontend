import { createFeature, createReducer, on } from '@ngrx/store';
import { UploadActions } from './upload.actions';
import { FileItem, UploadState } from './upload.types';

const initialState: UploadState = {
  files: [],
  error: undefined,
};
export const uploadFeature = createFeature({
  name: 'upload',
  reducer: createReducer(
    initialState,

    on(
      UploadActions.uploadImages,
      (state, { files }): UploadState => ({
        ...state,
        error: undefined,
        files: [
          ...state.files,
          ...files.map(
            (file): FileItem => ({
              name: file.name,
              status: 'loading',
              error: undefined,
            })
          ),
        ],
      })
    ),

    on(
      UploadActions.errorUploadingImages,
      (state, { error, files }): UploadState => ({
        ...state,
        files: state.files.map(file => ({
          ...file,
          ...(files.find(f => f.uuid === file.name)
            ? { status: 'error', error }
            : undefined),
        })),
        error: error,
      })
    )
  ),
});
