import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform {

  private static readonly KILO = 1000;

  transform(bytes: number): string {
    if (bytes < FileSizePipe.KILO) {
      return `${bytes} B`;
    }

    const kilobytes = bytes / FileSizePipe.KILO;

    if (kilobytes < FileSizePipe.KILO) {
      return `${kilobytes.toFixed()} kB`;
    }

    const megabytes = kilobytes / FileSizePipe.KILO;

    if (megabytes < FileSizePipe.KILO) {
      return `${megabytes.toFixed(1)} MB`;
    }

    const gigabytes = megabytes / FileSizePipe.KILO;

    return `${gigabytes.toFixed(1)} GB`;
  }

}
