import { Component, inject, signal } from '@angular/core';
import { AppDataService } from '../../core/services/app-data.service';
import { Application } from '../../core/interfaces/application.interface';
import { _ } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CategorieService } from '../../core/services/categories.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private _appDataService: AppDataService = inject(AppDataService);
  private _router: Router = inject(Router);
  private _categorieService: CategorieService = inject(CategorieService);

  apps = signal<Application[]>([]);
  banner: Application[] = [];
  categories: any[] = [];

  ngOnInit(): void {
    this._appDataService.getAppsBanner().subscribe({
      next: (apps: Application[]) => {
        console.log(apps);
        this.banner = apps;
      },
    });

    this._appDataService.getRecentlyUpdated().subscribe({
      next: (apps: Application[]) => {
        console.log(apps);
        this.apps.set(apps);
      },
    });

    this.categories = [...this._categorieService.getCategories()];
  }

  viewCategory(key: string) {
    this._router.navigate(['apps', 'category', key]);
  }
}
