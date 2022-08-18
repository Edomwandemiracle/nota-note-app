import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationComponent } from './authentication.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'create-account', component: CreateAccountComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
