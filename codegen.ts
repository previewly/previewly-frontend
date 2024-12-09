import type * as cli from '@graphql-codegen/cli';

import { environment } from './src/environments/environment';

const config: cli.CodegenConfig = {
  overwrite: true,
  schema: environment.graphqlUrl,
  documents: ['./src/app/api/**/*.graphql'],
  emitLegacyCommonJSImports: false,
  generates: {
    './src/app/api/schema.graphql': {
      plugins: ['schema-ast'],
    },
    './src/app/api/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
      ],
      config: {
        addExplicitOverride: true,
        omitOperationSuffix: true,
        querySuffix: 'Query',
        mutationSuffix: 'Mutation',
        serviceName: 'ApiClient',
        sdkClass: true,
        skipTypename: true,

        skipTypeNameForRoot: true,
        preResolveTypes: true,
        declarationKind: 'interface',
        onlyOperationTypes: true,
        inlineFragmentTypes: 'combine',

        namingConvention: {
          enumValues: 'keep',
        },
        strictScalars: true,
        scalars: {
          Upload: 'File',
        },
      },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
