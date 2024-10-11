import { Injectable } from '@angular/core';

import { LocalStorageState } from './storage-preview.types';

@Injectable({
  providedIn: 'root',
})
export class StoragePreviewService {
  private readonly tokenKey = 'previewToken';
  private readonly urlsKey = 'previewUrls';

  initState(token: string) {
    this.saveToken(token);
    this.saveUrls([]);
  }

  readState(): LocalStorageState {
    return {
      token: localStorage.getItem(this.tokenKey) || undefined,
      urls: this.getStorageUrls(),
    };
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  addUrl(url: string) {
    const urls = this.getStorageUrls();
    urls.push(url);
    this.saveUrls(urls);
  }

  private getStorageUrls(): string[] {
    return JSON.parse(localStorage.getItem(this.urlsKey) || '[]');
  }

  private saveUrls(urls: string[]) {
    localStorage.setItem(this.urlsKey, JSON.stringify(urls));
  }
}
