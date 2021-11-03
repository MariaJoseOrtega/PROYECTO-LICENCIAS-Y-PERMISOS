import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'worked'
})
export class WorkedPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): unknown {
    return value ? 'NO' : 'SI';
  }

}
