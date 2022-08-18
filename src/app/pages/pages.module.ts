import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteCardComponent } from '../components/note-card/note-card.component';
import { NoteDetailsComponent } from './note-details/note-details.component';

@NgModule({
  declarations: [
    PagesComponent,
    NoteListComponent,
    NoteCardComponent,
    NoteDetailsComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, FormsModule, ReactiveFormsModule],
})
export class PagesModule {}
