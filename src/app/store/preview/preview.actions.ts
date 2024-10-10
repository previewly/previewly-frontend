import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { LocalStorageState, Preview } from './preview.types';

export const PreviewActions = createActionGroup({
  source: 'Preview',
  events: {
    'Check localStorage token': props<{ token: string }>(),

    'Apply initial state from localStorage': props<{
      state: LocalStorageState;
    }>(),
    'Create new token': emptyProps(),
    'Success create token': props<{ token: string }>(),

    'Add new url': props<{ url: string }>(),
    'Success add new url': props<{ preview: Preview }>(),

    'Start timer for update preview after success adding': props<{
      preview: Preview;
    }>(),
    'Start timer for update preview': props<{ preview: Preview }>(),

    'Update preview': props<{ preview: Preview }>(),
    'Should not update preview': emptyProps(),
    'Success update preview': props<{ preview: Preview }>(),
    'Error update preview': props<{ error: string }>(),

    'Empty token': emptyProps(),
    'Empty token on adding new url': emptyProps(),
  },
});
