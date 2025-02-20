import { createFeature, createReducer } from '@ngrx/store';
import { SharedState } from './shared.types';

const initialState: SharedState = { isLoading: false };
export const sharedFeature = createFeature({
  name: 'shared',
  reducer: createReducer(initialState),
});
