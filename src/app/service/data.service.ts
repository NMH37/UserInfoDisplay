import { User } from './../data.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe, CurrencyPipe, formatPercent } from '@angular/common';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private datePipe: DatePipe, private currencyPipe: CurrencyPipe, private http: HttpClient) { }
  transformDate(date) {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
  transformCurrency(amount) {
    return this.currencyPipe.transform(amount, 'USD');
  }
  /*  transformNumber(amount) {
     return (amount * 100) + '%';
   } */
  transformIntoPercent(amount) {
    return formatPercent(amount, 'en-US');
  }
  getUsers() {
    return this.http.get<User[]>(baseUrl);
  }
}
