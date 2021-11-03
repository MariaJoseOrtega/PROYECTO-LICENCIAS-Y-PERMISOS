import {AbstractControl, Validators} from '@angular/forms';

export class CustomValidators {
  static required({value}: AbstractControl): boolean {
    console.log(value);
    if (value)
      return value.hasValidator(Validators.required);
    else
      return false;
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password')?.value; // get password from our password form control
    const passwordConfirmation: string = control.get('passwordConfirmation')?.value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== passwordConfirmation) {
      console.log('entor');
      // if they don't match, set an error in our confirmPassword form control
      control.get('passwordConfirmation')?.setErrors({NoPasswordMatch: true});
    }
  }
}
