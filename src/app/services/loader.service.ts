import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _isLoading = signal<boolean>(false);

  get isLoading() {
    return this._isLoading.asReadonly();
  }

  constructor() { }

  start() {
    this._isLoading.set(true);
  }

  stop() {
    this._isLoading.set(false);
  }
}
