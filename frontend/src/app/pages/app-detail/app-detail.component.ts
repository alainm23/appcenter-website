import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppDataService } from '../../core/services/app-data.service';
import { _ } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DesktopApp } from '../../core/interfaces/desktop-app.interface';
import {
  getForegroundColor,
  getPrimaryColor,
} from '../../shared/utils/color.util';

interface Link {
  type: string;
  value: string;
  title?: string;
  icon?: string;
}

@Component({
  selector: 'app-app-detail',
  standalone: false,

  templateUrl: './app-detail.component.html',
  styleUrl: './app-detail.component.scss',
})
export class AppDetailComponent implements OnInit, OnDestroy {
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _appDataService: AppDataService = inject(AppDataService);
  private _router: Router = inject(Router);

  id!: string;
  app!: DesktopApp;
  apps = signal<DesktopApp[]>([]);

  linkDataMap: Record<string, { title: string; icon: string }> = {
    homepage: { title: _('Website'), icon: 'heroGlobeAlt' },
    bugtracker: { title: _('Send Feedback'), icon: 'heroBugAnt' },
    help: { title: _('Get Help'), icon: 'heroQuestionMarkCircle' },
    donation: { title: _('Sponsor'), icon: 'heroHeart' },
    translate: { title: _('Contribute Translations'), icon: 'heroLanguage' },
    'vcs-browser': { title: _('Get The Source Code'), icon: 'heroCodeBracket' },
  };

  linksFirstPart: Link[] = [];
  linksSecondPart: Link[] = [];

  breakpoints = {
    0: {
      slidesPerView: 1,
      spaceBetween: 32,
    },
    576: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
  };

  isLoading = signal<boolean>(true);
  primaryColor: string = '';
  foregroundColor: string = '';

  private _subscriptions: Record<string, Subscription> = {};

  ngOnInit(): void {
    this._subscriptions['params'] = this._activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id') as string;

        if (!this.id) {
          this._router.navigate(['home']);
          return;
        }

        this.fetchData();
      }
    );
  }

  ngOnDestroy(): void {
    Object.values(this._subscriptions).forEach((sub) => sub.unsubscribe());
  }

  fetchData() {
    this.isLoading.set(true);
    this._appDataService.getAppDetail(this.id).subscribe({
      next: (app: DesktopApp) => {
        this.app = { ...app };
        console.log(this.app);

        const [firstPart, secondPart] = this.splitArray(
          this.enrichLinks(this.app.url)
        );
        this.linksFirstPart = [...firstPart];
        this.linksSecondPart = [...secondPart];

        this.getAppsByDeveloper();
        this.scrollToTop();

        this.primaryColor = getPrimaryColor(this.app);
        this.foregroundColor = getForegroundColor(this.primaryColor);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  getAppsByDeveloper() {
    this._appDataService
      .getAppsByDeveloper(this.app.developer['en'])
      .subscribe({
        next: (apps: DesktopApp[]) => {
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
      return { ...link, title: 'Unknown', icon: 'heroQuestionMarkCircle' };
    });
  }

  splitArray<T>(array: T[]): [T[], T[]] {
    const middle = Math.ceil(array.length / 2);
    return [array.slice(0, middle), array.slice(middle)];
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
