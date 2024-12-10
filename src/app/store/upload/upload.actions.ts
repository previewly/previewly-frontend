import { createActionGroup, props } from '@ngrx/store';
import { UploadImageStatus } from '../../api/graphql';
import { Unique } from '../../app.types';

export const UploadActions = createActionGroup({
  source: 'Upload',
  events: {
    'Upload images': props<{ files: File[] }>(),
    'Success upload images': props<{ result: UploadImageStatus[] }>(),

    'Error uploading images': props<{ error: string; files: Unique[] }>(),
  },
});
