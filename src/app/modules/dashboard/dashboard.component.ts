import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AUTH_STORAGE } from 'src/constants/app-constants';

@Component({
  selector: 'app-dashboard',
  host: {
    class: 'flex-expand',
  },
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  username: string | null = '';
  isNavigating = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: RouterEvent) => {
        if (event instanceof NavigationStart) {
          this.isNavigating = true;
        }
        if (event instanceof NavigationEnd) {
          this.isNavigating = false;
        }
        if (event instanceof NavigationError) {
          this.isNavigating = false;
        }
        if (event instanceof NavigationCancel) {
          this.isNavigating = false;
        }
      });
  }

  ngOnInit(): void {
    this.username = localStorage.getItem(AUTH_STORAGE.username);
  }
}
