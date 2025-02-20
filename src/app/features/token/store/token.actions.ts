import { createActionGroup, props } from '@ngrx/store';

export const TokenActions = createActionGroup({
  source: 'token',
  events: {
    'Set token': props<{ token: string }>(),

    'Cannot expose token': props<{ error: Error }>(),
  },
});
