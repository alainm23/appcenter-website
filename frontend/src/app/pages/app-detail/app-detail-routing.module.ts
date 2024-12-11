import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppDetailComponent } from './app-detail.component';

const routes: Routes = [{ path: '', component: AppDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppDetailRoutingModule {}
