import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  notes: Note[];

  constructor() {}

  getNotes() {
    return this.notes;
  }

  getNote(id: string) {
    return this.notes.find((note) => note.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);
  }

  updateNote(id: string, updatedField: Partial<Note>) {
    const note = this.getNote(id);
    Object.assign(note!, updatedField);
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) return;
    this.notes.splice(noteIndex, 1);
  }
}
