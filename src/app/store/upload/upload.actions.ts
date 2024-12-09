import { createActionGroup, props } from '@ngrx/store';
import { UploadImageStatus } from '../../api/graphql';

export const UploadActions = createActionGroup({
  source: 'Upload',
  events: {
    'Upload images': props<{ files: File[] }>(),
    'Update progress': props<{ progress: number | undefined }>(),
    'Success upload images': props<{ result: UploadImageStatus[] }>(),

    'Error uploading images': props<{ error: string }>(),
  },
});
