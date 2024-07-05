import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private readonly BASE_URL = 'http://localhost:3000/type/'

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll() {
    return this.httpClient.get<any[]>(this.BASE_URL);
  }

  add(form: any) {
    return this.httpClient.post(this.BASE_URL, form);
  }
}
