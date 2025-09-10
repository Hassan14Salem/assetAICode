import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassificationsComponent } from './classifications/classifications.component';
import { CountriesComponent } from './countries/countries.component';
import { RegionsComponent } from './regions/regions.component';
import { CitiesComponent } from './cities/cities.component';
import { AssetTypesComponent } from './asset-types/asset-types.component';
import { AssetStatusesComponent } from './asset-statuses/asset-statuses.component';

const routes: Routes = [
  { path: '', redirectTo: 'classifications', pathMatch: 'full' },
  { path: 'classifications', component: ClassificationsComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'regions', component: RegionsComponent },
  { path: 'cities', component: CitiesComponent },
  { path: 'asset-types', component: AssetTypesComponent },
  { path: 'asset-statuses', component: AssetStatusesComponent },
  // { path: '**', redirectTo: 'classifications' } // Optional: wildcard for 404
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicDataRoutingModule {}
