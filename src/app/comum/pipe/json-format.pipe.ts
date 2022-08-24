import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonFormat'
})
export class JsonFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? JSON.stringify(value, null, 2)
      .replace(/ /g, '&nbsp;')
      .replace(/\n/g, '<br/>') : 'null';
  }

}
