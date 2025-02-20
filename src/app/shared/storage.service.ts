import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { sharedFeature } from './store/shared/shared.reducers';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly store = inject(Store);
  private canUseCookies = this.store.selectSignal(sharedFeature.canUseCookies);

  getItem(key: string): string | null | undefined {
    return this.canUseCookies() ? localStorage.getItem(key) : null;
  }

  setItem(key: string, value: string) {
    if (this.canUseCookies()) {
      localStorage.setItem(key, value);
    }
  }
}
