import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountableHoliday'
})
export class DiscountableHolidayPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value? 'Descontable' : 'No Descontable';
  }

}
