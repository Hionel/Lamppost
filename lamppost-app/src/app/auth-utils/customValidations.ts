import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Ishift } from '../interfaces/ishift';

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

  static duplicateSlug(
    shifts: Ishift[],
    shiftSlugControlName: string
  ): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
      const newShiftSlug = controls.get(shiftSlugControlName);
      const index = shifts.findIndex(
        (shift) => shift.shiftSlug === newShiftSlug?.value
      );
      if (index >= 0) {
        console.log(shifts);
        newShiftSlug?.setErrors({
          slugAlreadyInUse: {
            actualValue: newShiftSlug.value,
          },
        });
        return { slugAlreadyInUse: true };
      }
      return null;
    };
  }
}
