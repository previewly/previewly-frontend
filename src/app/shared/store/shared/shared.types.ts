import { Loadable } from '../../../app.types';

export enum CookieCategory {
  NECESSARY = 'necessary',
  ANALYTICS = 'analytics',
}
export type SharedState = Loadable & {
  cookie: CookieCategory[];
};
