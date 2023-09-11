import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Note } from './note';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private notesUrl = 'api/notes';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
  
  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl)
    .pipe(
      catchError(this.handleError<Note[]>('getNotes', []))
    );
  }

  getNote(id: number): Observable<Note> {
    const url = `${this.notesUrl}/${id}`;
    return this.http.get<Note>(url).pipe(
      tap(() => {}),
      catchError(this.handleError<Note>('getNote'))
    );
  }

  addNote(): Observable<Note> {
    const newNote = {
                      id: Date.now(),
                      title: "Заметка " + Date.now(),
                      description: Date.now() + " Разнообразный и богатый опыт консультация с широким активом требуют определения и уточнения форм развития. Значимость этих проблем настолько очевидна, что реализация намеченных плановых заданий требуют от нас анализа модели развития. Повседневная практика показывает, что консультация с широким активом представляет собой интересный эксперимент проверки систем массового участия. Идейные соображения высшего порядка, а также начало повседневной работы по формированию позиции играет важную роль в формировании соответствующий условий активизации."
    };

    return this.http.post<Note>(this.notesUrl, newNote, this.httpOptions)
    .pipe(
      catchError(this.handleError<Note>('addNote'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}