import { Undefined } from '../../../app.types';

export type ViewPreviewItemStatus =
  | 'preding'
  | 'success'
  | 'error'
  | 'dump'
  | 'loading';

export interface ViewPreviewItemImage {
  item: string;
  window: string;
  original: string;
}
export interface ViewPreviewData {
  url: string | undefined;
  shortUrl: string | undefined;
  preview: ViewPreviewItemImage | Undefined;
  previewAltTitle: string | undefined;
  title: string | undefined;
}

export interface ViewPreviewItem {
  status: ViewPreviewItemStatus;
  error: string | undefined;
  data: ViewPreviewData | undefined;
}

export const createLoadedPreviewItem = (
  data?: ViewPreviewData | undefined
): ViewPreviewItem => {
  return {
    status: 'loading',
    error: undefined,
    data: data,
  };
};

export const createErrorPreviewItem = (
  error: string | undefined,
  data?: ViewPreviewData | undefined
): ViewPreviewItem => ({
  status: 'error',
  error: error,
  data: data,
});
