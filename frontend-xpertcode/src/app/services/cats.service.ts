import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CatsService {
  private http = inject(HttpClient);
  private readonly BASE = 'http://localhost:3000/api';

  listBreeds(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE}/breeds`);
  }

  searchBreeds(q: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE}/breeds/search`, {
      params: { q },
    });
  }

  getBreed(id: string): Observable<any> {
    return this.http.get<any>(`${this.BASE}/breeds/${id}`);
  }

  imagesByBreed(id: string, limit = 8) {
    return this.http.get<any[]>(`${this.BASE}/breeds/images/bybreedid`, {
      params: { breed_id: id, limit },
    });
  }
}
