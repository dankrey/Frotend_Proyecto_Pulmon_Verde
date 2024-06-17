import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Comentario {
  id?: number;
  tittle: string;
  comment: string;
  author: string;
  creationDate?: Date;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ComentarioServiceService {


  private baseUrl = 'http://localhost:8080/comment';

  constructor(private http: HttpClient) { }

  agregarComentario(comment: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.baseUrl}/add`, comment);
  }

  actualizarComentario(id: number, comment: Comentario): Observable<Comentario> {
    return this.http.put<Comentario>(`${this.baseUrl}/${id}`, comment);
  }

  obtenerComentarioPorId(id: number): Observable<Comentario> {
    return this.http.get<Comentario>(`${this.baseUrl}/${id}`);
  }

  obtenerComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.baseUrl}`);
  }

  eliminarComentario(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}