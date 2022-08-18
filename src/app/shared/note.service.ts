import { Injectable } from '@angular/core';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor() {}

  saveNote(note: Note[]) {
    if (!localStorage.getItem('notes')) {
      localStorage.setItem('notes', JSON.stringify(note));
    } else {
      localStorage.setItem('notes', JSON.stringify(note));
    }
  }

  updateNote(note: any) {
    let updatedNote: Note[];
    updatedNote = this.getNoteList();
    updatedNote.filter((a) => {
      if (a.id === note.id) {
        a.id = note.id;
        a.title = note.title;
        a.content = note.content;
      }
      return a;
    });
    this.saveNote(updatedNote);
  }

  getNoteList(): Note[] {
    return JSON.parse(localStorage.getItem('notes') as string);
  }

  deleteNote(id: number) {
    let newNote: Note[];
    newNote = this.getNoteList();
    newNote.splice(
      newNote.findIndex((a) => a.id === id),
      1
    );
    this.saveNote(newNote);
  }
}
