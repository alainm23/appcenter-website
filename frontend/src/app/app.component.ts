import { Component, inject } from '@angular/core';
import { TranslationService } from './core/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly TranslationService: TranslationService =
    inject(TranslationService);
}
