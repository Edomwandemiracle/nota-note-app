import { NoteDetailsComponent } from './note-details/note-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteListComponent } from './note-list/note-list.component';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../shared/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'note', component: NoteListComponent },
      { path: 'details/:id', component: NoteDetailsComponent },
      { path: 'new-note', component: NoteDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
