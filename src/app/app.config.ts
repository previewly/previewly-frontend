import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  isDevMode,
  makeEnvironmentProviders,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { getAnalytics, provideAnalytics } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import * as Sentry from '@sentry/angular';
import { TraceService } from '@sentry/angular';
import { environment } from '../environments/environment';
import { provideApollo } from './api/graphql.provider';
import { routes } from './app.routes';
import { previewEffects } from './store/preview/preview.effects';
import { previewFeature } from './store/preview/preview.reducers';
import { uploadEffects } from './store/upload/upload.effects';
import { uploadFeature } from './store/upload/upload.reducers';

const provideSentry = () =>
  makeEnvironmentProviders([
    { provide: ErrorHandler, useValue: Sentry.createErrorHandler() },
    { provide: Sentry.TraceService, deps: [Router] },
  ]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      inject(TraceService);
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      [previewFeature.name]: previewFeature.reducer,
      [uploadFeature.name]: uploadFeature.reducer,
    }),
    provideEffects([previewEffects, uploadEffects]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
    provideHttpClient(),
    provideApollo(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideSentry(),
  ],
};
