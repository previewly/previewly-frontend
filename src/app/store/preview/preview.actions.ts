import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { PreviewItem } from './preview.types';

export const PreviewActions = createActionGroup({
  source: 'Preview',
  events: {
    'Check localStorage token': props<{ token: string }>(),

    'Apply token from local storage': props<{ token: string }>(),
    'Add urls from local storage': props<{ urls: PreviewItem[] }>(),

    'Create new token': emptyProps(),
    'Success create token': props<{ token: string }>(),
    'Cannot create a token': emptyProps(),

    'Add new url': props<{ url: string }>(),
    'Success add new url': props<{ urls: PreviewItem[] }>(),

    'Empty token': emptyProps(),
    'Empty token on adding new url': emptyProps(),

    'Update previews': props<{ urls: PreviewItem[] }>(),
    'Success update previews': props<{ urls: PreviewItem[] }>(),
  },
});
