import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transferencia } from '../modelos/transferencia.model';

const baseUrl = 'https://ripleybk.herokuapp.com/api/transferencias';

export interface Banks {
  Array: Banco[];
}

export interface Banco {
  name: string;
  id: number;
}

@Injectable({
  providedIn: 'root'
})

export class TransferenciaService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Transferencia[]> {
    return this.http.get<Transferencia[]>(baseUrl);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getBancos(): Observable<Banks> {
    return this.http.get<Banks>("https://bast.dev/api/banks.php");
  }
}