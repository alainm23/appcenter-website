import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateValuePipe } from '../../core/pipes/translate-value.pipe';
import { AppCardComponent } from '../../shared/components/app-card/app-card.component';


@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    TranslateModule,
    TranslateValuePipe,
    AppCardComponent
  ]
})
export class CategoryModule { }
