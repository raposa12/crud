import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodicElement } from '../models/periodicElement';

//injentando a api
@Injectable()
export class periodicElementService {
  elementApiurl = 'https://localhost:44366/api/periodicElements';
  constructor(private http: HttpClient) { }

  getElements(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(this.elementApiurl);
  }
}
