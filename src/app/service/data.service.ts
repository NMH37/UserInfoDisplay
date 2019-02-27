import { User } from './../data.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe, CurrencyPipe } from '@angular/common';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private datePipe: DatePipe, private currencyPipe: CurrencyPipe, private http: HttpClient) { }
  trasformDate(date) {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
  trasformCurrency(amount) {
    return this.currencyPipe.transform(amount, 'USD');
  }
  getUsers() {
    return this.http.get<User[]>(baseUrl);
  }
}
