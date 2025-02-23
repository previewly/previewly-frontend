import { EffectConfig } from '@ngrx/effects';

export type Undefined = null | undefined;
export interface Loadable {
  isLoading: boolean;
}

export interface Unique {
  uuid: string;
}

export interface WithError {
  error: string | Undefined;
}

export interface MaybeWithError {
  error?: Error | Undefined;
}

export enum Status {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  LOADING = 'LOADING',
}

export interface WithStatus {
  status: Status;
}

export type DataWrapper<T> = MaybeWithError & WithStatus & { data?: T };

export const wrapError = <T>(error: Error): DataWrapper<T> => ({
  error,
  status: Status.ERROR,
});
export const wrapLoading = <T>(): DataWrapper<T> => ({
  status: Status.LOADING,
});
export const wrapSuccess = <T>(data: T): DataWrapper<T> => ({
  data,
  status: Status.SUCCESS,
});

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
