import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Inform {
  id?: number;
  author: string;
  tittle: string;
  description: string;
  imageUrl: string;
  creationDate: Date;
}
@Injectable({
  providedIn: 'root'
})
export class InformeserivicioService {

  private baseUrl = 'http://localhost:8080/inform';

  constructor(private http: HttpClient) { }

  createInform(inform: Inform): Observable<Inform> {
    return this.http.post<Inform>(`${this.baseUrl}/create`, inform);
  }

  updateInform(id: number, inform: Inform): Observable<Inform> {
    return this.http.put<Inform>(`${this.baseUrl}/${id}`, inform);
  }

  deleteInform(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAllInform(): Observable<Inform[]> {
    return this.http.get<Inform[]>(`${this.baseUrl}`);
  }

  getInformById(id: number): Observable<Inform> {
    return this.http.get<Inform>(`${this.baseUrl}/${id}`);
  }
}