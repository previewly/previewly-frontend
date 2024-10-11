export interface LocalStorageState {
  token: string | undefined;
  urls: Urls;
}

export type Urls = Record<string, string>;
