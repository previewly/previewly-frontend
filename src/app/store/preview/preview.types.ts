import { Loadable } from '../../app.types';

export interface LocalStorageState {
  token: string | undefined;
  urls: string[];
}

export interface PreviewData {
  url: URL;
  preview?: string;
  title?: string;
  description?: string;
  status: string;
}

export interface PreviewState extends Loadable {
  token: string | undefined;
  previews: PreviewData[];
}
