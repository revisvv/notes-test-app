import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  note: Note | undefined;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getNote();
    });
  }

  getNote(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.noteService.getNote(id)
                    .subscribe(note => this.note = note);
  }
}
