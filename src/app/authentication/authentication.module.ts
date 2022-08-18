import { MaterialModule } from './../material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';

import { CreateAccountComponent } from './create-account/create-account.component';

import { AuthenticationComponent } from './authentication.component';

@NgModule({
  declarations: [
    AuthenticationComponent,
    CreateAccountComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthenticationRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [],
})
export class AuthenticationModule {}
