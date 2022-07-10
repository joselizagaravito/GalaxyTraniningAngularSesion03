import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFountComponent } from './page-not-fount/page-not-fount.component';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { ExternalRoutingModule } from './external/external-routing.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFountComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule, ExternalRoutingModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
