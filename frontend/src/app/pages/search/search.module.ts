import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppCardComponent } from '../../shared/components/app-card/app-card.component';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    TranslateModule,
    AppCardComponent
  ]
})
export class SearchModule { }
