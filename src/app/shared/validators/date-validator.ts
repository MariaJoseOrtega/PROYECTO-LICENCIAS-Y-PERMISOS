import { FormControl, ValidationErrors } from '@angular/forms';
import { isDate, isBefore, isAfter } from 'date-fns';

export class DateValidators {
  static valid(control: FormControl): ValidationErrors {
    const value = control.value;
    const isValid = value ? isDate(new Date(value)) : true;
    return isValid ? null : { valid: true };
  }

  static max(maxDate: string): (control: FormControl) => ValidationErrors {
    return (control: FormControl): ValidationErrors => {
      const max = new Date(maxDate);
      const value = control.value;
      const isValid = value ? isBefore(value, max) : true;
      return isValid ? null : { max: true };
    };
  }

  static min(minDate: string): (control: FormControl) => ValidationErrors {
    return (control: FormControl): ValidationErrors => {
      const min = new Date(minDate);
      const value = control.value;
      const isValid = value ? isAfter(value, min) : true;
      return isValid ? null : { min: true };
    };
  }
}
