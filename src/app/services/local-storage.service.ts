import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getLocalStorageItem(name: string) {
    const data = localStorage.getItem(name);
    return data;
  }

  storeItemOnLocalStorage(key: string, item: any) {
    localStorage.setItem(key, item);
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}