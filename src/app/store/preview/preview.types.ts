import { Loadable } from '../../app.types';

export interface PreviewItem {
  url: URL;
  status: string;
  updateAttempts: number;
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
