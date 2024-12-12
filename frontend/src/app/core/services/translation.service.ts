import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  defaultLang = 'en';
  supportedLangs = ['en', 'es'];

  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lng');
      const userLang = this.getUsersLocale();

      this.defaultLang = savedLang
        ? savedLang
        : this.supportedLangs.includes(userLang)
        ? userLang
        : this.defaultLang;

      this.translateService.setDefaultLang(this.defaultLang);
      this.translateService.use(this.defaultLang);
    }
  }

  getUsersLocale(defaultValue: string = this.defaultLang): string {
    if (typeof window === 'undefined' || !window.navigator) {
      return defaultValue;
    }

    const navigator = window.navigator as Navigator & {
      userLanguage?: string;
      browserLanguage?: string;
    };
    let lang = navigator.languages
      ? navigator.languages[0]
      : navigator.language;

    lang =
      lang ||
      navigator.browserLanguage ||
      navigator.userLanguage ||
      defaultValue;

    return lang.split('-')[0];
  }

  changeLang(lang: string) {
    if (!this.supportedLangs.includes(lang)) {
      console.warn(`Idioma no soportado: ${lang}`);
      return;
    }
    this.translateService.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lng', lang);
    }
  }
}
