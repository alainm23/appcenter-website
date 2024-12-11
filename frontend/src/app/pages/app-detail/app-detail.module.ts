import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppDetailRoutingModule } from './app-detail-routing.module';
import { AppDetailComponent } from './app-detail.component';
import { TranslateValuePipe } from '../../core/pipes/translate-value.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent } from '@ng-icons/core';
import { AppCardComponent } from '../../shared/components/app-card/app-card.component';

@NgModule({
  declarations: [AppDetailComponent],
  imports: [
    CommonModule,
    AppDetailRoutingModule,
    TranslateValuePipe,
    TranslateModule,
    NgIconComponent,
    AppCardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppDetailModule {}
