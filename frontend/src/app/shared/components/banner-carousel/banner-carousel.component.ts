import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { TranslateValuePipe } from '../../../core/pipes/translate-value.pipe';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DesktopApp } from '../../../core/interfaces/desktop-app.interface';
import { AppDataService } from '../../../core/services/app-data.service';
import {
  getBackgroundImage,
  getForegroundColor,
  getPrimaryColor,
} from '../../utils/color.util';

@Component({
  selector: 'app-banner-carousel',
  standalone: true,
  imports: [CommonModule, TranslateValuePipe],
  templateUrl: './banner-carousel.component.html',
  styleUrl: './banner-carousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BannerCarouselComponent implements OnInit {
  private _router: Router = inject(Router);
  private _appDataService: AppDataService = inject(AppDataService);

  isLoading = signal<boolean>(false);
  apps = signal<DesktopApp[]>([]);

  ngOnInit(): void {
    this._appDataService.getAppsBanner().subscribe({
      next: (apps: DesktopApp[]) => {
        this.apps.set(
          apps.map((app: DesktopApp) => {
            const primaryColor = getPrimaryColor(app);
            const foregroundColor = getForegroundColor(primaryColor);
            return { ...app, primaryColor, foregroundColor };
          })
        );
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  viewApp(app: DesktopApp) {
    this._router.navigate(['apps/' + app.id]);
  }

  backgroundImage(primaryColor: string): string {
    return getBackgroundImage(primaryColor);
  }
}
