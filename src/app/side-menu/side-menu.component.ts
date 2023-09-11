import { Component, OnInit } from '@angular/core';

import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent{
  notes: Note[] = [];

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes()
                    .subscribe(notes => this.notes = notes);
  }

  add(): void {
    this.noteService.addNote()
      .subscribe(note => {
        this.notes.push(note);
      });
  }
}
