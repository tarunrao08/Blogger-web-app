import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { PASSWORD, USERNAME } from 'src/constants/app-constants';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  getAuthErrors(formItem: AbstractControl | null, type: string) {
    if (formItem?.hasError('required')) {
      return `${type} field is required.`;
    }
    if (formItem?.hasError('minlength')) {
      let minlength =
        type.toLowerCase() === 'username'
          ? USERNAME.minLength
          : PASSWORD.minLength;
      return `${type} must be atleast ${minlength} letters long`;
    }
    if (formItem?.hasError('maxlength')) {
      let maxlength =
        type.toLowerCase() === 'username'
          ? USERNAME.maxLength
          : PASSWORD.maxLength;
      return `${type} must be atmost ${maxlength} letters long`;
    }
    if (formItem?.hasError(type)) {
      return `Please enter a valid ${type}`;
    }
    if (formItem?.hasError('pattern') && type.toLowerCase() === 'password') {
      return 'Password must container 2 special Charachters and a numbers.';
    }
    if (formItem?.hasError('taken')) {
      return `${type} already exists, please use a unique ${type}`;
    }

    return '';
  }
}
