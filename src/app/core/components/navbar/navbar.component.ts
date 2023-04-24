import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AUTH_STORAGE } from 'src/constants/app-constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  username: string | null = null;
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.username = localStorage.getItem(AUTH_STORAGE.username);
    } else {
      this.auth.username.subscribe((res) => (this.username = res));
    }
  }

  logOutUser() {
    this.auth.logOutUser();
  }
}
