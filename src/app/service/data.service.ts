import { User } from './../data.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private datePipe: DatePipe, private http: HttpClient) { }
  trasformDate(date) {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  getUsers() {
    return this.http.get<User[]>(baseUrl);
  }
}
