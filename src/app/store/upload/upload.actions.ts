import { createActionGroup, props } from '@ngrx/store';

export const UploadActions = createActionGroup({
  source: 'Upload',
  events: {
    'Upload images': props<{ files: File[] }>(),
    'Update progress': props<{ progress: number | undefined }>(),
    'Success upload images': props<{ files: File[] }>(),

    'Error uploading images': props<{ error: string }>(),
  },
});
