import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CookieValue } from 'vanilla-cookieconsent';

export const SharedActions = createActionGroup({
  source: 'shared',
  events: {
    'Dispatch cookie consent': props<{ cookie: CookieValue }>(),
    'Retry create token': emptyProps(),
  },
});
