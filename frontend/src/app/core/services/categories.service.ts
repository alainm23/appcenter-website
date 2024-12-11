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
      keys: ['Utility'],
    },
    {
      name: _('Audio'),
      key: 'audio',
      icon: 'heroSpeakerWave',
      keys: ['Audio', 'Music'],
    },
    {
      name: _('Communication'),
      key: 'communication',
      icon: 'heroChatBubbleBottomCenterText',
      keys: [
        'Chat',
        'ContactManagement',
        'Email',
        'InstantMessaging',
        'IRCClient',
        'Telephony',
        'VideoConference',
      ],
    },
    {
      name: _('Development'),
      key: 'development',
      icon: 'heroCodeBracket',
      keys: [
        'Database',
        'Debugger',
        'Development',
        'GUIDesigner',
        'IDE',
        'RevisionControl',
        'TerminalEmulator',
        'WebDevelopment',
      ],
    },
    {
      name: _('Education'),
      key: 'education',
      icon: 'heroBookOpen',
      keys: ['Education'],
    },
    {
      name: _('Finance'),
      key: 'finance',
      icon: 'heroCreditCard',
      keys: ['Economy', 'Finance'],
    },
    {
      name: _('Fun & Games'),
      key: 'games',
      icon: 'heroPuzzlePiece',
      keys: [
        'ActionGame',
        'AdventureGame',
        'Amusement',
        'ArcadeGame',
        'BlocksGame',
        'BoardGame',
        'CardGame',
        'Game',
        'KidsGame',
        'LogicGame',
        'RolePlaying',
        'Shooter',
        'Simulation',
        'SportsGame',
        'StrategyGame',
      ],
    },
    {
      name: _('Graphics'),
      key: 'graphics',
      icon: 'heroSwatch',
      keys: [
        '2DGraphics',
        '3DGraphics',
        'Graphics',
        'ImageProcessing',
        'Photography',
        'RasterGraphics',
        'VectorGraphics',
      ],
    },
    {
      name: _('Internet'),
      key: 'internet',
      icon: 'heroCursorArrowRays',
      keys: ['Network', 'P2P'],
    },
    {
      name: _('Math, Science, & Engineering'),
      key: 'science',
      icon: 'heroCalculator',
      keys: [
        'ArtificialIntelligence',
        'Astronomy',
        'Biology',
        'Calculator',
        'Chemistry',
        'ComputerScience',
        'DataVisualization',
        'Electricity',
        'Electronics',
        'Engineering',
        'Geology',
        'Geoscience',
        'Math',
        'NumericalAnalysis',
        'Physics',
        'Robotics',
        'Science',
      ],
    },
    {
      name: _('Media Production'),
      key: 'media-production',
      icon: 'heroVideoCamera',
      keys: ['AudioVideoEditing', 'Midi', 'Mixer', 'Recorder', 'Sequencer'],
    },
    {
      name: _('Office'),
      key: 'office',
      icon: 'heroBriefcase',
      keys: [
        'Office',
        'Presentation',
        'Publishing',
        'Spreadsheet',
        'WordProcessor',
      ],
    },
    {
      name: _('Privacy & Security'),
      key: 'privacy-security',
      icon: 'heroShieldCheck',
      keys: ['Security'],
    },
    {
      name: _('System'),
      key: 'system',
      icon: 'heroCog',
      keys: ['Monitor', 'System'],
    },
    {
      name: _('Universal Access'),
      key: 'accessibility',
      icon: 'heroUserCircle',
      keys: ['Accessibility'],
    },
    {
      name: _('Video'),
      key: 'video',
      icon: 'heroPlay',
      keys: ['Tuner', 'TV', 'Video'],
    },
    {
      name: _('Writing & Language'),
      key: 'writing-language',
      icon: 'heroPencilSquare',
      keys: [
        'Dictionary',
        'Languages',
        'Literature',
        'OCR',
        'TextEditor',
        'TextTools',
        'Translation',
        'WordProcessor',
      ],
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
