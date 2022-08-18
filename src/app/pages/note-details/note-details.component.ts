import { NoteService } from './../../shared/note.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
})
export class NoteDetailsComponent implements OnInit {
  note!: Note;
  notes: Note[] = [];
  noteId!: number;
  updatedNote!: Note;
  isNew: boolean = true;

  createNote = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private _Activatedroute: ActivatedRoute,
    private route: Router,
    private noteService: NoteService
  ) {}

  ngOnInit() {
    this.getParams();
  }
  getParams() {
    this._Activatedroute.params.forEach((params: Params) => {
      this.noteId = +params['id'];
      this.populateForm(this.noteId);
      if (this.noteId) {
        this.isNew = false;
      }
    });
  }

  create() {
    const user = JSON.parse(localStorage.getItem('loggedInUser') as string);
    this.note = {
      id: Math.floor(Math.random() * 1000),
      title: this.createNote.value.title,
      content: this.createNote.value.content,
      userId: user.id,
    };
    this.notes.push(this.note);
    this.noteService.saveNote(this.notes);
    this.route.navigate(['/nota/note']);
  }

  populateForm(id: number) {
    if (localStorage.getItem('notes')) {
      this.notes = this.noteService.getNoteList();
      this.notes.filter((note) => {
        if (note.id === id) {
          this.createNote = this.fb.group({
            title: [note.title],
            content: [note.content],
          });
        }
      });
    }
  }

  updateNote() {
    this.updatedNote = {
      id: this.noteId,
      title: this.createNote.value.title,
      content: this.createNote.value.content,
    };
    this.noteService.updateNote(this.updatedNote);
    this.route.navigate(['/nota/note']);
  }

  cancel() {
    this.route.navigate(['/nota/note']);
  }

  submit() {
    if (this.isNew) {
      this.create();
    } else {
      this.updateNote();
    }
  }
}
