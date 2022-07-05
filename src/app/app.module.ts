import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { TodosComponent } from './todos/todos.component';
import { NotesComponent } from './notes/notes.component';
import { BookmarkTileComponent } from './bookmark-tile/bookmark-tile.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { FormsModule } from '@angular/forms';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { AddTodoComponent } from './add-todo/add-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    BookmarksComponent,
    TodosComponent,
    NotesComponent,
    BookmarkTileComponent,
    AddNoteComponent,
    NoteCardComponent,
    EditNoteComponent,
    TodoItemComponent,
    AddTodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
