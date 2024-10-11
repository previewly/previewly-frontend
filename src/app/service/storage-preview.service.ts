import { Injectable } from '@angular/core';

import { LocalStorageState, Urls } from './storage-preview.types';

@Injectable({
  providedIn: 'root',
})
export class StoragePreviewService {
  private readonly tokenKey = 'previewToken';
  private readonly urlsKey = 'previewUrls';

  initState(token: string) {
    this.saveToken(token);
    this.saveUrls({});
  }

  readState(): LocalStorageState {
    return {
      token: localStorage.getItem(this.tokenKey) || undefined,
      urls: this.getStorageUrls() || {},
    };
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  addUrl(url: string) {
    const urls = this.getStorageUrls() || {};
    urls[url] = url;
    this.saveUrls(urls);
  }

  private getStorageUrls(): Urls | undefined {
    const urls = JSON.parse(localStorage.getItem(this.urlsKey) || '{}');
    return this.isUrls(urls) ? urls : undefined;
  }

  private saveUrls(urls: Record<string, string>) {
    localStorage.setItem(this.urlsKey, JSON.stringify(urls));
  }

  private isUrls(urls: unknown): urls is Urls {
    return Object.prototype.toString.call(urls) !== '[object Array]';
  }
}
