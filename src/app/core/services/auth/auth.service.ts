import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { LoggedUser, User } from '../../models/user.model';
import { AUTH_STORAGE } from 'src/constants/app-constants';
import {
  BASE_URL,
  CURRENT_USER_PATH,
  LOGIN_PATH,
  USERS_PATH,
} from 'src/constants/url-constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  username = new Subject<string>();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  logInUser(user: User): Observable<LoggedUser> {
    /*
     * Login user
     */
    return this.http.post<LoggedUser>(
      `${BASE_URL}/${LOGIN_PATH}`,
      { user },
      this.httpOptions
    );
  }

  setUser({ user }: LoggedUser) {
    localStorage.setItem(AUTH_STORAGE.token, user.token);
    localStorage.setItem(AUTH_STORAGE.username, user.username);
    localStorage.setItem(AUTH_STORAGE.email, user.email);
    this.username.next(user.username);
  }

  signUpUser(user: User): Observable<LoggedUser> {
    /*
     * Signup User
     */

    return this.http.post<LoggedUser>(
      `${BASE_URL}/${USERS_PATH}`,
      { user },
      this.httpOptions
    );
  }

  isLoggedIn() {
    /*
     * Check the log status of the user.
     */

    return !!localStorage.getItem(AUTH_STORAGE.token);
  }

  getToken() {
    return localStorage.getItem(AUTH_STORAGE.token);
  }

  getUser(): Observable<{ user: User }> {
    return this.http.get<{ user: User }>(`${BASE_URL}/${CURRENT_USER_PATH}`);
  }

  logOutUser() {
    localStorage.removeItem(AUTH_STORAGE.token);
    localStorage.removeItem(AUTH_STORAGE.email);
    localStorage.removeItem(AUTH_STORAGE.username);
    this.router.navigate(['/login']);
  }
}
