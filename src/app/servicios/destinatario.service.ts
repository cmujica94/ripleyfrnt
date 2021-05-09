import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destinatario } from '../modelos/destinatario.model';

const baseUrl = 'https://ripleybk.herokuapp.com/api/destinatarios';

@Injectable({
  providedIn: 'root'
})
export class DestinatarioService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Destinatario[]> {
    return this.http.get<Destinatario[]>(baseUrl);
  }

  get(id: any): Observable<Destinatario> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Destinatario[]> {
    return this.http.get<Destinatario[]>(`${baseUrl}?title=${title}`);
  }
}