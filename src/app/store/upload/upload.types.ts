import { Loadable } from '../../app.types';

export type FileItem = Loadable & {
  name: string;
};

export interface UploadState {
  files: FileItem[];
  error: string | undefined;
}
