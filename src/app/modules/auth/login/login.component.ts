import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ValidationService } from 'src/app/core/services/validation/validation.service';

@Component({
  selector: 'app-login',
  host: {
    class: 'container',
  },
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading = false;
  errors: { [key: string]: string } = {};
  otherError = '';
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private auth: AuthService,
    private validation: ValidationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getEmailErrorMessage() {
    return this.validation.getAuthErrors(this.email, 'email');
  }

  getPasswordErrorMessage() {
    return this.validation.getAuthErrors(this.password, 'password');
  }

  onSubmit() {
    this.otherError = '';
    this.isLoading = true;
    this.errors = {};
    const user: User = {
      email: this.email.value,
      password: this.password.value,
    };

    this.auth
      .logInUser(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.auth.setUser(res);
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (e) => {
          this.errors = e.error.errors;
          if (this.errors && this.errors['email or password']) {
            this.email.setErrors({ invlid: true });
            this.password.setErrors({ invlid: true });
          }
          if (!window.navigator.onLine || e.status == 0) {
            this.otherError = 'Please Check your internet connection.';
          }
          this.isLoading = false;
        },
      });
  }
}
