import { NoteService } from './../../shared/note.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/note';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];
  searchTerm: string = '';
  searchControl: FormControl = new FormControl('');
  debounce: number = 100;
  currentUser: any;
  constructor(
    private route: Router,
    private noteService: NoteService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getNoteList();
  }

  getNoteList() {
    let noteList: Note[] = [];
    this.currentUser = this.authService.getLoggedInUser();
    noteList = this.noteService.getNoteList();
    if (noteList)
      this.notes = noteList.filter(
        (note) => note.userId === this.currentUser.id
      );
  }

  gotoDetails() {
    this.route.navigate(['/nota/new-note']);
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id);
    this.getNoteList();
  }
  sortDescendingOrder() {
    this.notes = this.notes.sort((a: any, b: any) =>
      a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
    );
  }
  sortAscendingOrder() {
    this.notes = this.notes.sort((a: any, b: any) =>
      b.title.toLowerCase() > a.title.toLowerCase() ? 1 : -1
    );
  }

  search(e: any) {
    this.searchControl = e;

    this.searchControl.valueChanges
      .pipe(debounceTime(this.debounce), distinctUntilChanged())
      .subscribe((query) => {
        let value = query.toLocaleLowerCase();
        if (value) {
          this.notes = this.notes.filter((dt) => {
            return (
              dt.title.toLocaleLowerCase().includes(value) ||
              dt.content.toLocaleLowerCase().includes(value)
            );
          });
        } else {
          return this.getNoteList();
        }
      });
  }
}
