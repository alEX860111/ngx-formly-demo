import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'fileSize'})
export class FileSizePipe implements PipeTransform {
  transform(value: number): string {
    const kb = value / 1000;
    if (kb < 1000) {
      return `${kb.toFixed()} kB`;
    }
    const mb = kb / 1000;
    return `${mb.toFixed(1)} MB`;
  }
}
