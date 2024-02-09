import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BikeDetailComponent } from './bike-detail/bike-detail.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', redirectTo: '/bikes', pathMatch: 'full' },
  { path: 'bikes', component: SearchComponent },
  { path: 'bikes/:id', component: BikeDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
