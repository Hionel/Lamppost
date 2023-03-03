import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default class CustomValidators {
  static matchPasswords(
    controlName: string,
    matchControlName: string
  ): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
      const control = controls.get(controlName);
      const matchControl = controls.get(matchControlName);
      if (!matchControl?.errors && control?.value !== matchControl?.value) {
        matchControl?.setErrors({
          matching: {
            actualValue: matchControl?.value,
            requiredValue: control?.value,
          },
        });
        return { matching: true };
      }
      return null;
    };
  }
}
