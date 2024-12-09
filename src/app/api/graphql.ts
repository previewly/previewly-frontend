import { Injectable } from '@angular/core';
import * as ApolloCore from '@apollo/client/core';
import * as Apollo from 'apollo-angular';
import { gql } from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Upload: { input: undefined; output: undefined };
}

export enum Status {
  error = 'error',
  pending = 'pending',
  success = 'success',
}

export type Preview = {
  id: number;
  url: string;
  status: Status;
  image: string;
  error?: string | null;
  title?: string | null;
};

export type UploadImageStatus = {
  id: number;
  status: Status;
  error?: string | null;
};

export type CreateTokenVariables = Exact<{ [key: string]: never }>;

export type CreateToken = { token: string };

export type AddUrlVariables = Exact<{
  token: Scalars['String']['input'];
  url: Scalars['String']['input'];
}>;

export type AddUrl = { preview?: Preview | null };

export type UploadImagesVariables = Exact<{
  images: Array<Scalars['Upload']['input']> | Scalars['Upload']['input'];
}>;

export type UploadImages = { upload: Array<UploadImageStatus> };

export type VerifyTokenVariables = Exact<{
  token: Scalars['String']['input'];
}>;

export type VerifyToken = { isValid?: boolean | null };

export type GetPreviewVariables = Exact<{
  token: Scalars['String']['input'];
  url: Scalars['String']['input'];
}>;

export type GetPreview = { preview?: Preview | null };

export const Preview = gql`
  fragment Preview on PreviewData {
    id
    url
    status
    image
    error
    title
  }
`;
export const UploadImageStatus = gql`
  fragment UploadImageStatus on UploadImageStatus {
    id
    status
    error
  }
`;
export const CreateTokenDocument = gql`
  mutation CreateToken {
    token: createToken
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateTokenMutation extends Apollo.Mutation<
  CreateToken,
  CreateTokenVariables
> {
  override document = CreateTokenDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const AddUrlDocument = gql`
  mutation AddUrl($token: String!, $url: String!) {
    preview: addUrl(token: $token, url: $url) {
      ...Preview
    }
  }
  ${Preview}
`;

@Injectable({
  providedIn: 'root',
})
export class AddUrlMutation extends Apollo.Mutation<AddUrl, AddUrlVariables> {
  override document = AddUrlDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UploadImagesDocument = gql`
  mutation UploadImages($images: [Upload!]!) {
    upload(images: $images) {
      ...UploadImageStatus
    }
  }
  ${UploadImageStatus}
`;

@Injectable({
  providedIn: 'root',
})
export class UploadImagesMutation extends Apollo.Mutation<
  UploadImages,
  UploadImagesVariables
> {
  override document = UploadImagesDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const VerifyTokenDocument = gql`
  query VerifyToken($token: String!) {
    isValid: verifyToken(token: $token)
  }
`;

@Injectable({
  providedIn: 'root',
})
export class VerifyTokenQuery extends Apollo.Query<
  VerifyToken,
  VerifyTokenVariables
> {
  override document = VerifyTokenDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const GetPreviewDocument = gql`
  query GetPreview($token: String!, $url: String!) {
    preview: getPreviewData(token: $token, url: $url) {
      ...Preview
    }
  }
  ${Preview}
`;

@Injectable({
  providedIn: 'root',
})
export class GetPreviewQuery extends Apollo.Query<
  GetPreview,
  GetPreviewVariables
> {
  override document = GetPreviewDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface WatchQueryOptionsAlone<V extends ApolloCore.OperationVariables>
  extends Omit<ApolloCore.WatchQueryOptions<V>, 'query' | 'variables'> {}

interface QueryOptionsAlone<V>
  extends Omit<ApolloCore.QueryOptions<V>, 'query' | 'variables'> {}

interface MutationOptionsAlone<T, V>
  extends Omit<ApolloCore.MutationOptions<T, V>, 'mutation' | 'variables'> {}

@Injectable({ providedIn: 'root' })
export class ApiClient {
  constructor(
    private createTokenMutation: CreateTokenMutation,
    private addUrlMutation: AddUrlMutation,
    private uploadImagesMutation: UploadImagesMutation,
    private verifyTokenQuery: VerifyTokenQuery,
    private getPreviewQuery: GetPreviewQuery
  ) {}

  createToken(
    variables?: CreateTokenVariables,
    options?: MutationOptionsAlone<CreateToken, CreateTokenVariables>
  ) {
    return this.createTokenMutation.mutate(variables, options);
  }

  addUrl(
    variables: AddUrlVariables,
    options?: MutationOptionsAlone<AddUrl, AddUrlVariables>
  ) {
    return this.addUrlMutation.mutate(variables, options);
  }

  uploadImages(
    variables: UploadImagesVariables,
    options?: MutationOptionsAlone<UploadImages, UploadImagesVariables>
  ) {
    return this.uploadImagesMutation.mutate(variables, options);
  }

  verifyToken(
    variables: VerifyTokenVariables,
    options?: QueryOptionsAlone<VerifyTokenVariables>
  ) {
    return this.verifyTokenQuery.fetch(variables, options);
  }

  verifyTokenWatch(
    variables: VerifyTokenVariables,
    options?: WatchQueryOptionsAlone<VerifyTokenVariables>
  ) {
    return this.verifyTokenQuery.watch(variables, options);
  }

  getPreview(
    variables: GetPreviewVariables,
    options?: QueryOptionsAlone<GetPreviewVariables>
  ) {
    return this.getPreviewQuery.fetch(variables, options);
  }

  getPreviewWatch(
    variables: GetPreviewVariables,
    options?: WatchQueryOptionsAlone<GetPreviewVariables>
  ) {
    return this.getPreviewQuery.watch(variables, options);
  }
}
