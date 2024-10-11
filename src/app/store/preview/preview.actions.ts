import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { PreviewData, PreviewItem } from './preview.types';

export const PreviewActions = createActionGroup({
  source: 'Preview',
  events: {
    'Check localStorage token': props<{ token: string }>(),

    'Apply token from local storage': props<{ token: string }>(),
    'Add urls from local storage': props<{ urls: PreviewItem[] }>(),

    'Create new token': emptyProps(),
    'Success create token': props<{ token: string }>(),

    'Add new url': props<{ url: string }>(),
    'Success add new url': props<{
      url: string;
      status: string;
      attempts: number;
      preview: PreviewData;
    }>(),

    'Empty token': emptyProps(),
    'Empty token on adding new url': emptyProps(),
  },
});
