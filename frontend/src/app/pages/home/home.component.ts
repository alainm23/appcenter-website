import { Component, inject, signal } from '@angular/core';
import { AppDataService } from '../../core/services/app-data.service';
import { _ } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CategorieService } from '../../core/services/categories.service';
import { DesktopApp } from '../../core/interfaces/desktop-app.interface';

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

  apps = signal<DesktopApp[]>([]);
  categories: any[] = [];

  ngOnInit(): void {
    this._appDataService.getRecentlyUpdated().subscribe({
      next: (apps: DesktopApp[]) => {
        this.apps.set(apps);
      },
    });

    this.categories = [...this._categorieService.getCategories()];
  }

  viewCategory(key: string) {
    this._router.navigate(['apps', 'category', key]);
  }
}
