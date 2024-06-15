import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {


  private baseUrl = 'http://localhost:8080/Article';

  constructor(private http: HttpClient) { }

  addArticle(article: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, article);
  }

  getAllArticles(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  updateArticle(id: number, article: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, article);
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}