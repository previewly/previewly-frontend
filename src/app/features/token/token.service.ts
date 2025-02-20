import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiClient } from '../../api/graphql';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly api = inject(ApiClient);

  create(): Observable<string> {
    return this.api.createToken().pipe(
      map(result => {
        if (result.data?.token) {
          return result.data.token;
        } else {
          throw Error('Empty token');
        }
      })
    );
  }

  verify(token: string): Observable<string> {
    return this.api.verifyToken({ token }).pipe(
      map(result => {
        if (result.data?.isValid) {
          return token;
        } else {
          throw Error('Invalid token');
        }
      })
    );
  }
}
