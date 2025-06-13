import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NoteService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  // private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  constructor(public http: HttpClient) {}

  getNotes() {
    return this.http.get(this.apiUrl); // GET /posts
  }

  getNote(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`); // GET /posts/:id
  }

  createNote(note: any) {
    return this.http.post(this.apiUrl, note); // POST /posts
  }

  updateNote(id: number, note: any) {
    return this.http.put(`${this.apiUrl}/${id}`, note); // PUT /posts/:id
  }

  deleteNote(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`); // DELETE /posts/:id
  }
}
