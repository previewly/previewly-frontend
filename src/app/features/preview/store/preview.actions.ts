import { createActionGroup, props } from '@ngrx/store';

import { PreviewItem } from './preview.types';

export const PreviewActions = createActionGroup({
  source: 'Preview',
  events: {
    'Add new url': props<{ url: string }>(),
    'Success add new url': props<{ url: PreviewItem }>(),
    'Error add new url': props<{ error: string }>(),

    'Remove preview': props<{ url: string }>(),
  },
});
