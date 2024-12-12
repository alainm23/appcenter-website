import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateValuePipe } from '../../../core/pipes/translate-value.pipe';
import { DesktopApp } from '../../../core/interfaces/desktop-app.interface';

@Component({
  selector: 'app-app-card',
  standalone: true,
  imports: [TranslateValuePipe],
  templateUrl: './app-card.component.html',
  styleUrl: './app-card.component.scss',
})
export class AppCardComponent {
  private _router: Router = inject(Router);

  @Input() app!: DesktopApp;

  viewApp() {
    this._router.navigate(['apps/' + this.app.id]);
  }
}
