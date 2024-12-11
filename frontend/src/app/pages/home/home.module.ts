import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AppCardComponent } from '../../shared/components/app-card/app-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconComponent } from '@ng-icons/core';
import { BannerCarouselComponent } from '../../shared/components/banner-carousel/banner-carousel.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppCardComponent,
    BannerCarouselComponent,
    TranslateModule,
    NgIconComponent,
  ],
})
export class HomeModule {}
