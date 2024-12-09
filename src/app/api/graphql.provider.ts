import { makeEnvironmentProviders } from '@angular/core';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { environment } from '../../environments/environment';

const baseLink = () =>
  setContext(() => ({ headers: { Accept: 'charset=utf-8' } }));

export const provideApollo = () =>
  makeEnvironmentProviders([
    Apollo,
    {
      provide: APOLLO_OPTIONS,
      useFactory: () => ({
        link: ApolloLink.from([
          baseLink(),
          createUploadLink({ uri: environment.graphqlUrl }),
        ]),
        cache: new InMemoryCache(),
      }),
    },
  ]);
