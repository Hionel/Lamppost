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

  // static duplicateUserIdentifier(
  //   controlName: string,
  //   storedUsers: StoredUsers[]
  // ): ValidatorFn {
  //   return (controls: AbstractControl): ValidationErrors | null => {
  //     const control = controls.get(controlName);
  //     let storedIdentifiers;
  //     if (controlName === 'email') {
  //       storedIdentifiers = storedUsers.find(
  //         (user: StoredUsers) => user.email === control?.value
  //       );
  //     }
  //     if (controlName === 'userName') {
  //       storedIdentifiers = storedUsers.find(
  //         (user: StoredUsers) => user.userName === control?.value
  //       );
  //     }
  //     if (storedIdentifiers) {
  //       control?.setErrors({
  //         alreadyInUse: {
  //           actualValue: control?.value,
  //           duplicateValue: storedIdentifiers.email,
  //         },
  //       });
  //       return { alreadyInUse: true };
  //     }
  //     return null;
  //   };
  // }
}
