import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService implements OnDestroy {
  notes: Note[] = [];

  storageListenSub: Subscription;

  constructor() {
    this.loadState();
    this.storageListenSub = fromEvent<StorageEvent>(
      window,
      'storage'
    ).subscribe((event: StorageEvent) => {
      if (event.key === 'notes') {
        this.loadState();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.storageListenSub) this.storageListenSub.unsubscribe();
  }

  getNotes() {
    return this.notes;
  }

  getNote(id: string) {
    return this.notes.find((note) => note.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);
    this.saveState();
  }

  updateNote(id: string, updatedField: Partial<Note>) {
    const note = this.getNote(id);
    Object.assign(note!, updatedField);
    this.saveState();
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) return;
    this.notes.splice(noteIndex, 1);
    this.saveState();
  }

  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadState() {
    try {
      const notesInStorage = JSON.parse(localStorage.getItem('notes') ?? '[]');
      this.notes.length = 0;
      this.notes.push(...notesInStorage);
      // this.notes = notesInStorage;
    } catch (error) {}
  }
}
