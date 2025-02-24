import { createActionGroup, props } from '@ngrx/store';

import { PreviewItem } from './preview.types';

export const PreviewActions = createActionGroup({
  source: 'Preview',
  events: {
    'Add new urls': props<{ urls: string[] }>(),
    'Success add new urls': props<{ urls: PreviewItem[] }>(),
    'Error add new urls': props<{ error: string }>(),

    'Update previews after init': props<{ urls: string[] }>(),

    'Remove preview': props<{ url: string }>(),
  },
});
