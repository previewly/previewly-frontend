import { Loadable, WithError } from '../../../app.types';

export enum CookieCategory {
  NECESSARY = 'necessary',
  ANALYTICS = 'analytics',
}
export type SharedState = Loadable &
  WithError & {
    cookie: CookieCategory[];
  };
