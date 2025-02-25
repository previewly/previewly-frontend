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
  id?: number;
  url: string;
  title: string | undefined;
  shortUrl: string;
  preview: ViewPreviewItemImage | Undefined;
  imageId?: number;
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
