import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckDataService {

  localStorageKey="DataCovid"
  constructor() { }

  saveData(data:Array<any>):void{
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }
  getData():Array<any> | null {
    const userString = localStorage.getItem(this.localStorageKey);
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }
}
