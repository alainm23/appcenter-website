import { Component, inject, signal } from '@angular/core';
import { AppDataService } from '../../core/services/app-data.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Application } from '../../core/interfaces/application.interface';
import { CategorieService } from '../../core/services/categories.service';

@Component({
  selector: 'app-category',
  standalone: false,

  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  private _appDataService: AppDataService = inject(AppDataService);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _router: Router = inject(Router);
  private _categorieService: CategorieService = inject(CategorieService);

  apps = signal<Application[]>([]);
  category: any;

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const key = params.get('category') as string;

      if (!key) {
        this._router.navigate(['home']);
        return;
      }

      this.category = this._categorieService.getCategoryByKey(key);
      this.searchApps();
    });
  }

  searchApps() {
    this._appDataService.filterAppsByCategory(this.category.key).subscribe({
      next: (apps: Application[]) => {
        this.apps.set(apps);
      },
    });
  }
}
