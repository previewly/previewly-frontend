import { Loadable } from '../../app.types';

export interface LocalStorageState {
  token: string | undefined;
  urls: string[];
}
export interface PreviewItem {
  url: URL;
  status: string;
  data: PreviewData | null;
  error: string | null;
}
export interface PreviewData {
  preview: string;
  title?: string;
  description?: string;
}

export interface PreviewState extends Loadable {
  token: string | undefined;
  previews: PreviewItem[];
}
