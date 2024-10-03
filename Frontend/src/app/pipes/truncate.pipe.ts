import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (!value) return '';
    const plainText = value.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags
    return plainText.length > limit ? plainText.substr(0, limit) + '...' : plainText;
  }

}
