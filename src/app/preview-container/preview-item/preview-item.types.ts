export type ViewPreviewItemStatus =
  | 'preding'
  | 'success'
  | 'error'
  | 'dump'
  | 'loading';

export interface ViewPreviewData {
  url: string | undefined;
  shortUrl: string | undefined;
  preview: string | undefined;
  previewAltTitle: string | undefined;
  title: string | undefined;
}

export interface ViewPreviewItem {
  status: ViewPreviewItemStatus;
  error: string | undefined;
  data: ViewPreviewData | undefined;
}

export const createDumpPreviewItem = (): ViewPreviewItem => ({
  status: 'dump',
  error: undefined,
  data: undefined,
});

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
