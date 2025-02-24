import { inject, Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { MutationResult } from 'apollo-angular';
import {
  catchError,
  concat,
  exhaustMap,
  map,
  Observable,
  of,
  switchMap,
  takeWhile,
  tap,
  timer,
  toArray,
} from 'rxjs';
import {
  AddUrl,
  ApiClient,
  GetPreview,
  Preview,
  ResizeImage,
  Status,
} from '../../api/graphql';
import {
  DataWrapper,
  Undefined,
  wrapError,
  wrapLoading,
  wrapSuccess,
} from '../../app.types';

const MAX_POLLING_COUNT = 10;
const POLLING_INTERVAL = 3000;

type ApiResult = MutationResult<AddUrl> | ApolloQueryResult<GetPreview>;

export type PreviewResult = Preview & {
  imageSmall?: string;
  imageWindow?: string;
};

@Injectable({ providedIn: 'root' })
export class PreviewService {
  private readonly api = inject(ApiClient);

  getPreview(
    url: string,
    token: string
  ): Observable<DataWrapper<PreviewResult>> {
    return this.pollPreview(url, token).pipe(
      exhaustMap(preview => this.hydratePreview(preview, token)),
      map(({ previewResult, resizedImages }) =>
        this.wrapResult(previewResult, resizedImages)
      ),
      catchError(error => of(wrapError<Preview>(new Error(error.message))))
    );
  }

  private pollPreview(url: string, token: string) {
    let stopPolling = false;
    let pollingCount = 0;
    return this.api.addUrl({ url, token }).pipe(
      tap(result => {
        if (this.shouldStop(result.data)) {
          stopPolling = true;
        }
      }),
      switchMap(addUrlResult =>
        concat(
          of(addUrlResult),
          timer(0, POLLING_INTERVAL).pipe(
            switchMap(() =>
              this.api.getPreview({ url, token }, { fetchPolicy: 'no-cache' })
            ),
            tap(() => pollingCount++),
            tap(() => {
              if (pollingCount > MAX_POLLING_COUNT) {
                stopPolling = true;
              }
            }),
            tap(result => {
              if (this.shouldStop(result.data)) {
                stopPolling = true;
              }
            }),
            takeWhile(() => !stopPolling, true)
          )
        ).pipe(
          toArray(),
          map(results => this.getLastPreviewResult(results))
        )
      )
    );
  }

  private hydratePreview(previewResult: ApiResult, token: string) {
    if (previewResult.data?.preview?.imageId) {
      return this.api
        .resizeImage({ imageId: previewResult.data.preview.imageId, token })
        .pipe(
          map(resizedImages => {
            return { previewResult, resizedImages: resizedImages.data };
          })
        );
    } else {
      return of({ previewResult, resizedImages: null });
    }
  }

  private getLastPreviewResult(results: ApiResult[]) {
    const lastResult = results.at(-1);
    if (lastResult?.data?.preview?.status === Status.success) {
      return lastResult;
    } else {
      throw new Error('Preview not ready');
    }
  }

  private wrapResult(
    result: ApiResult,
    resizedImages: ResizeImage | Undefined
  ): DataWrapper<PreviewResult> {
    if (result.loading) {
      return wrapLoading();
    }
    if (result.errors && result.errors[0]) {
      return wrapError(new Error(result.errors[0].message));
    }
    return result.data?.preview
      ? {
          ...wrapSuccess({
            ...result.data.preview,
            imageSmall: resizedImages?.resized_400x196?.image?.url,
            imageWindow: resizedImages?.resized_1280x627?.image?.url,
          }),
        }
      : wrapError(new Error('No preview'));
  }

  private shouldStop(data: { preview?: Preview | null } | Undefined): boolean {
    return data?.preview?.status === Status.success;
  }
}
