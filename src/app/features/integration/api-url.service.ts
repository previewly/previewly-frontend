import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlService {
  private readonly baseUrl = environment.apiBase;

  createApiImageUrl(token: string): string {
    return this.createUrl('image', token);
  }

  createApiJsonUrl(): string {
    return [this.baseUrl, 'json'].join('/') + '/';
  }

  createApiGqlUrl(): string {
    return [this.baseUrl, 'graphql'].join('/') + '/';
  }

  createApiUploadUrl(): string {
    return [this.baseUrl, 'upload'].join('/') + '/';
  }

  private createUrl(type: string, token: string): string {
    return [this.baseUrl, type, token].join('/') + '/';
  }
}
