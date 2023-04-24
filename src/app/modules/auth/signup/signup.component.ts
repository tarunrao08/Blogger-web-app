import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Error } from 'src/app/core/models/error.model';
import { takeUntil } from 'rxjs/operators';

import { LoggedUser, User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ValidationService } from 'src/app/core/services/validation/validation.service';
import { PASSWORD, REGEX_PATTERN, USERNAME } from 'src/constants/app-constants';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-signup',
  host: {
    class: 'container',
  },
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading = false;
  errors: Error = {};
  baseError = '';

  signupForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(USERNAME.minLength),
      Validators.maxLength(USERNAME.maxLength),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(PASSWORD.minLength),
      Validators.pattern(REGEX_PATTERN),
    ]),
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private validation: ValidationService
  ) {}

  ngOnInit(): void {}

  getUsernameErrorMessage() {
    return this.validation.getAuthErrors(
      this.signupForm.get('username'),
      'Username'
    );
  }

  getEmailErrorMessage() {
    return this.validation.getAuthErrors(this.signupForm.get('email'), 'email');
  }

  getPasswordErrorMessage() {
    return this.validation.getAuthErrors(
      this.signupForm.get('password'),
      'Password'
    );
  }

  onSubmit() {
    this.baseError = '';
    this.isLoading = true;
    const newUser: User = this.signupForm.value;

    this.auth
      .signUpUser(newUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: LoggedUser) => {
          this.auth.setUser(res);
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (e) => {
          let errors = e.error.errors;
          if (errors && errors['username']) {
            this.signupForm
              .get('username')
              ?.setErrors({ taken: true }, { emitEvent: true });
          }
          if (errors && errors['email']) {
            this.signupForm
              .get('email')
              ?.setErrors({ taken: true }, { emitEvent: true });
          }
          if (
            !window.navigator.onLine ||
            e.statusCode === 0 ||
            e.statusCode === 408
          ) {
            this.baseError = 'Please Check your internet connection.';
          } else if (e.statusCode > 499) {
            this.baseError =
              'There is some issue with the server, we are tring to fix it.';
          }
          this.isLoading = false;
        },
      });
  }
}
