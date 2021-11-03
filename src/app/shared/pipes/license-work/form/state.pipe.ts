import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'state'
})
export class StatePipe implements PipeTransform {

  transform(value: boolean, ...args: boolean[]): unknown {
    return value ? 'Activo' : 'Inactivo';
  }

}
