import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translateValue',
  standalone: true,
})
export class TranslateValuePipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(value: { [key: string]: string }): string {
    if (!value || typeof value !== 'object') {
      return '';
    }

    const currentLang = this.translationService.defaultLang;

    return value[currentLang] || value['en'] || '';
  }
}
