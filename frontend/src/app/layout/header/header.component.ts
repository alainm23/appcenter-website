import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private _router: Router = inject(Router);

  goHome() {
    this._router.navigate(['']);
  }

  onEnter(event: any) {
    const searchValue = event.target.value;
    if (!searchValue) {
      return;
    }

    this._router.navigate(['/apps/search'], {
      queryParams: {
        q: event.target.value,
      },
    });
  }
}
