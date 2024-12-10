export type FileItemStatus = 'loading' | 'success' | 'error';

export interface FileItem {
  name: string;
  status: FileItemStatus;
  error: string | undefined;
}

export interface UploadState {
  files: FileItem[];
  error: string | undefined;
}
