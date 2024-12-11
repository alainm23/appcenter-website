import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppDataService } from '../../core/services/app-data.service';
import { Application } from '../../core/interfaces/application.interface';
import { _ } from '@ngx-translate/core';

interface Link {
  type: string;
  text: string;
  title?: string;
  icon?: string;
}

@Component({
  selector: 'app-app-detail',
  standalone: false,

  templateUrl: './app-detail.component.html',
  styleUrl: './app-detail.component.scss',
})
export class AppDetailComponent implements OnInit {
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _appDataService: AppDataService = inject(AppDataService);
  private _router: Router = inject(Router);

  id!: string;
  app!: Application;
  apps = signal<Application[]>([]);

  linkDataMap: Record<string, { title: string; icon: string }> = {
    homepage: { title: _('Website'), icon: 'heroGlobeAlt' },
    bugtracker: { title: _('Send Feedback'), icon: 'heroBugAnt' },
    help: { title: _('Get Help'), icon: 'heroQuestionMarkCircle' },
    donation: { title: _('Sponsor'), icon: 'heroHeart' },
    translate: { title: _('Contribute Translations'), icon: 'heroLanguage' },
  };

  linksFirstPart: Link[] = [];
  linksSecondPart: Link[] = [];

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') as string;

      if (!this.id) {
        this._router.navigate(['home']);
        return;
      }

      this.fetchData();
    });
  }

  fetchData() {
    this._appDataService.getAppDetail(this.id).subscribe({
      next: (app: Application) => {
        this.app = app;
        console.log(app);

        const [firstPart, secondPart] = this.splitArray(
          this.enrichLinks(this.app.url)
        );
        this.linksFirstPart = [...firstPart];
        this.linksSecondPart = [...secondPart];

        this.getAppsByDeveloper();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getAppsByDeveloper() {
    this._appDataService
      .getAppsByDeveloper(this.app.developer['en'])
      .subscribe({
        next: (apps: Application[]) => {
          this.apps.set(apps.filter((app) => app.id !== this.id));
        },
      });
  }

  enrichLinks(links: Link[]): Link[] {
    return links.map((link) => {
      const data = this.linkDataMap[link.type];
      if (data) {
        return { ...link, ...data };
      }
      return { ...link, title: 'Unknown', icon: 'bi-question' };
    });
  }

  splitArray<T>(array: T[]): [T[], T[]] {
    const middle = Math.ceil(array.length / 2);
    return [array.slice(0, middle), array.slice(middle)];
  }

  getPrimaryColor(data: Application, isDarkTheme = false) {
    const schemePreference = isDarkTheme ? 'dark' : 'light';

    if (data?.branding) {
      const themeColor = data.branding.find(
        (item) =>
          item.type === 'primary' && item.scheme_preference === schemePreference
      );
      if (themeColor) {
        return themeColor.value;
      }

      const generalColor = data.branding.find(
        (item) => item.type === 'primary'
      );
      if (generalColor) {
        return generalColor.value;
      }
    }

    if (data?.metadata) {
      const metaColor = data.metadata.find(
        (item) => item.key === 'x-appcenter-color-primary'
      );
      if (metaColor) {
        return metaColor.value;
      }
    }

    return '#8cd5ff';
  }

  private hexToRgb(hex: string): [number, number, number] {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }
    const bigint = parseInt(hex, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  }

  getForegroundColor(app: Application): string {
    const primaryColor = this.getPrimaryColor(app);
    const [r, g, b] = this.hexToRgb(primaryColor);
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance < 0.5 ? '#ffffff' : '#000000';
  }
}