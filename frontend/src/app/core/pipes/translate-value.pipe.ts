import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translateValue',
  standalone: true,
})
export class TranslateValuePipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(value: any): any {
    if (!value) {
      return '';
    }

    const currentLang = this.translationService.currentLang;
    const defaultLang = this.translationService.defaultLang;

    if (typeof value === 'object' && !Array.isArray(value)) {
      return value[currentLang] || value[defaultLang] || '';
    }

    if (Array.isArray(value)) {
      const foundValue =
        value.find((item) => item[currentLang]) ||
        value.find((item) => item[defaultLang]);
      return foundValue
        ? foundValue[currentLang] || foundValue[defaultLang] || ''
        : '';
    }

    return '';
  }
}
