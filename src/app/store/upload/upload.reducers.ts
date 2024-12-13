import { createFeature, createReducer, on } from '@ngrx/store';
import { Status } from '../../api/graphql';
import { UploadActions } from './upload.actions';
import { FileItem, FileItemStatus, UploadState } from './upload.types';

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
      UploadActions.successUploadImages,
      (state, { result }): UploadState => ({
        ...state,
        files: state.files.map((file): FileItem => {
          const sameFile = result.find(r => r.name === file.name);
          return {
            ...file,
            ...(sameFile
              ? {
                  status: toFileStatus(sameFile.status),
                  error: sameFile.error || undefined,
                }
              : undefined),
          };
        }),
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
    ),

    on(
      UploadActions.emptyToken,
      (state): UploadState => ({ ...state, error: 'Empty token' })
    )
  ),
});

const toFileStatus = (status: Status): FileItemStatus => {
  switch (status) {
    case 'success':
      return 'success';
    case 'error':
      return 'error';
    case 'pending':
      return 'loading';
    default:
      return 'error';
  }
};
