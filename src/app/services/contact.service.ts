import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly BASE_URL = 'http://localhost:3000/contact/'

  constructor(
    private httpClient: HttpClient
  ) { }

  get() {
    return this.httpClient.get<any[]>(this.BASE_URL)
  }

  add(form: any) {
    return this.httpClient.post(this.BASE_URL, form);
  }

  update(id: number, form: any) {
    return this.httpClient.put(this.BASE_URL + id, form);
  }

  remove(id: number) {
    return this.httpClient.delete(this.BASE_URL + id);
  }

  getById(id: number) {
    return this.httpClient.get<any>(this.BASE_URL + id)
  }
}
