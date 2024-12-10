import { EffectConfig } from '@ngrx/effects';

export interface Loadable {
  isLoading: boolean;
}

export interface Unique {
  uuid: string;
}

export const StoreDispatchEffect: EffectConfig & {
  functional: true;
  dispatch?: true;
} = { functional: true };

export const StoreUnDispatchEffect: EffectConfig & {
  functional: true;
  dispatch: false;
} = {
  functional: true,
  dispatch: false,
};
