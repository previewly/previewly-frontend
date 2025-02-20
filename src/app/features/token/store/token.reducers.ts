import { createFeature, createReducer } from '@ngrx/store';
import { TokenState } from './token.types';

const initialState: TokenState = { token: '' };
export const tokenFeature = createFeature({
  name: 'token',
  reducer: createReducer(initialState),
});
