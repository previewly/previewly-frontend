import { inject, makeEnvironmentProviders } from '@angular/core';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { environment } from '../../environments/environment';

const httpLink = (httpLink = inject(HttpLink)) =>
  httpLink.create({ uri: environment.graphqlUrl });

const baseLink = () =>
  setContext(() => ({ headers: { Accept: 'charset=utf-8' } }));

export const provideApollo = () =>
  makeEnvironmentProviders([
    Apollo,
    {
      provide: APOLLO_OPTIONS,
      useFactory: () => ({
        link: ApolloLink.from([baseLink(), httpLink()]),
        cache: new InMemoryCache(),
      }),
    },
  ]);
