import { Injectable } from '@angular/core';
import { _ } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  private readonly categories = [
    {
      name: _('Accesories'),
      key: 'accessories',
      icon: 'heroScissors',
    },
    {
      name: _('Audio'),
      key: 'audio',
      icon: 'heroSpeakerWave',
    },
    {
      name: _('Communication'),
      key: 'communication',
      icon: 'heroChatBubbleBottomCenterText',
    },
    {
      name: _('Development'),
      key: 'development',
      icon: 'heroCodeBracket',
    },
    {
      name: _('Education'),
      key: 'education',
      icon: 'heroBookOpen',
    },
    {
      name: _('Finance'),
      key: 'finance',
      icon: 'heroCreditCard',
    },
    {
      name: _('Fun & Games'),
      key: 'games',
      icon: 'heroPuzzlePiece',
    },
    {
      name: _('Graphics'),
      key: 'graphics',
      icon: 'heroSwatch',
    },
    {
      name: _('Internet'),
      key: 'internet',
      icon: 'heroCursorArrowRays',
    },
    {
      name: _('Math, Science, & Engineering'),
      key: 'science',
      icon: 'heroCalculator',
    },
    {
      name: _('Media Production'),
      key: 'media-production',
      icon: 'heroVideoCamera',
    },
    {
      name: _('Office'),
      key: 'office',
      icon: 'heroBriefcase',
    },
    {
      name: _('Privacy & Security'),
      key: 'privacy-security',
      icon: 'heroShieldCheck',
    },
    {
      name: _('System'),
      key: 'system',
      icon: 'heroCog',
    },
    {
      name: _('Universal Access'),
      key: 'accessibility',
      icon: 'heroUserCircle',
    },
    {
      name: _('Video'),
      key: 'video',
      icon: 'heroPlay',
    },
    {
      name: _('Writing & Language'),
      key: 'writing-language',
      icon: 'heroPencilSquare',
    },
  ];

  constructor() {}

  // Método para obtener todas las categorías
  getCategories() {
    return this.categories;
  }

  // Método para buscar una categoría por clave
  getCategoryByKey(key: string) {
    return this.categories.find((category) => category.key === key);
  }
}
