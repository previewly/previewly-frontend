import { Loadable, Status, Undefined } from '../../../app.types';

export interface ViewInfoImage {
  id: number;
  originalUrl: string;
  thumbnailUrl: string;
}
export interface ViewPreviewInfo {
  id: number;
  url: string;
  title: string;
  image: ViewInfoImage;
}

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
  imageId?: number;
}

export interface PreviewState extends Loadable {
  previews: PreviewItem[];
  urls: string[];
}
