import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService implements OnDestroy {
  bookmarks: Bookmark[] = [];

  storageListenSub: Subscription;

  constructor() {
    this.loadState();

    this.storageListenSub = fromEvent<StorageEvent>(
      window,
      'storage'
    ).subscribe((event: StorageEvent) => {
      if (event.key === 'bookmarks') {
        this.loadState();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.storageListenSub) {
      this.storageListenSub.unsubscribe();
    }
  }

  getBookmarks() {
    return this.bookmarks;
  }

  getBookmark(id: string) {
    return this.bookmarks.find((b) => b.id === id);
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark);

    this.saveState();
  }

  updateBookmark(id: string, updatedFields: Partial<Bookmark>) {
    const bookmark = this.getBookmark(id)!;
    Object.assign(bookmark, updatedFields);

    this.saveState();
  }

  deleteBookmark(id: string) {
    const bookmarkIndex = this.bookmarks.findIndex((b) => b.id === id);
    if (bookmarkIndex === -1) return;
    this.bookmarks.splice(bookmarkIndex, 1);

    this.saveState();
  }

  saveState() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  loadState() {
    try {
      const bookmarksInStorage = JSON.parse(
        localStorage.getItem('bookmarks') ?? '[]',
        (key, value) => {
          if (key === 'url') {
            return new URL(value);
          }
          return value;
        }
      );

      this.bookmarks.length = 0;
      this.bookmarks.push(...bookmarksInStorage);
    } catch (error) {}
  }
}
