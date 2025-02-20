import { inject, Injectable } from '@angular/core';
import { StorageService } from '../../shared/storage.service';

const TOKEN_KEY = 'previewly_token';
@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  private readonly storage = inject(StorageService);

  getToken(): string | undefined | null {
    return this.storage.getItem(TOKEN_KEY);
  }

  saveToken(token: string): void {
    this.storage.setItem(TOKEN_KEY, token);
  }
}
