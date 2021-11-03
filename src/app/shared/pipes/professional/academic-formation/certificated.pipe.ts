import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'certificated'
})
export class CertificatedPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): unknown {
    return value ? 'SI' : 'NO';
  }

}
