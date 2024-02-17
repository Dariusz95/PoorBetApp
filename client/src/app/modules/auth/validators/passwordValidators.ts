import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.value;

  const hasMinLength = password.length >= 5;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  return hasUpperCase && hasNumber && hasMinLength
    ? null
    : { passwordRequirements: true };
}

export function confirmPasswordValidator(
  control: AbstractControl
): ValidationErrors | null {
  const passwordControl = control.parent?.get('password') as AbstractControl;
  const confirmPasswordControl = control;

  return passwordControl &&
    confirmPasswordControl &&
    passwordControl?.value === confirmPasswordControl?.value
    ? null
    : { passwordsMismatch: true };
}

export function patternValidator(
  regex: RegExp,
  error: ValidationErrors
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    console.log('regex', regex);
    console.log('control.value', control.value);
    const valid = regex.test(control.value);
    console.log('valid', valid);

    return valid ? null : error;
  };
}
