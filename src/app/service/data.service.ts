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
  transformDate(date) {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
  /* transformCurrency(amount) {
    return this.currencyPipe.transform(amount, 'USD');
  }
  transformIntoPercent(amount) {
    return formatPercent(amount, 'en-US');
  } */
  getUsers() {
    return this.http.get<User[]>(baseUrl);
  }
  getFeildNames() {
    return ['id', 'email', 'name'];
  }
}
