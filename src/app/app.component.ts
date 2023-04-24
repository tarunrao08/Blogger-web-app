import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AUTH_STORAGE } from 'src/constants/app-constants';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  host: {
    class: 'flex-expand',
  },
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  destroy$ = new Subject();
  username? = '';
  title = 'asgmt3angular';

  constructor(public auth: AuthService, private router: Router) {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.auth
          .getUser()
          .pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
            if (
              res.user.username !=
                localStorage.getItem(AUTH_STORAGE.username) ||
              !localStorage.getItem(AUTH_STORAGE.token) ||
              !localStorage.getItem(AUTH_STORAGE.email)
            ) {
              this.auth.logOutUser();
            }
          });
      }
    });
  }

  ngOnInit(): void {}
}
