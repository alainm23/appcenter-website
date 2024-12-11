import { Component, inject, OnInit, signal } from '@angular/core';
import { AppDataService } from '../../core/services/app-data.service';
import { Application } from '../../core/interfaces/application.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: false,

  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  private _appDataService: AppDataService = inject(AppDataService);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  apps = signal<Application[]>([]);
  q: string = '';

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(async (query) => {
      console.log(query);
      this.q = query['q'] ?? null;

      if (!query['q']) {
        return;
      }

      this.searchApps();
    });
  }

  searchApps() {
    this._appDataService.searchApps(this.q).subscribe({
      next: (apps: Application[]) => {
        this.apps.set(apps);
      },
    });
  }
}
