import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: { clone: (arg0: { setHeaders: { Authorization: string } }) => any },
    next: { handle: (arg0: any) => any }
  ) {
    let tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Token ${this.auth.getToken()}`,
      },
    });
    return next.handle(tokenizeReq);
  }
}
