import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateValue',
  standalone: true,
})
export class TranslateValuePipe implements PipeTransform {
  transform(value: { [key: string]: string }, language: string = 'en'): string {
    if (!value || typeof value !== 'object') {
      return '';
    }

    return value[language] || value['en'] || '';
  }
}
