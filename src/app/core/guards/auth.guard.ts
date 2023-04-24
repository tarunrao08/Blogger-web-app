import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.auth.isLoggedIn()) {
      if (state.url.includes('login') || state.url.includes('signup')) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    } else {
      if (state.url.includes('login') || state.url.includes('signup')) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }
  }
}
