import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'nota',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
