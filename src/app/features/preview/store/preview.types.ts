import { Loadable, Status, Undefined } from '../../../app.types';

export interface PreviewItem {
  url: string;
  status: Status;
  data: PreviewData | Undefined;
  error: string | Undefined;
}
export interface Images {
  small?: string;
  window?: string;
  original: string;
}
export interface PreviewData {
  id: number;
  preview: Images;
  title?: string;
}

export interface PreviewState extends Loadable {
  previews: PreviewItem[];
}
