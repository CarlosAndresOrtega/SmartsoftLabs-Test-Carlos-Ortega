import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckDataService {

  localStorageKey="DataCovid"
  constructor() { }

  saveData(States:any,MaxDeaths:any,MinDeaths:any,MostAffected:any, totalPopulation:number, totalDeaths:number,percentageTotalDeaths:number):void{
    localStorage.setItem(this.localStorageKey, JSON.stringify(States));
    localStorage.setItem("MaxDeaths", JSON.stringify(MaxDeaths));
    localStorage.setItem("MinDeaths", JSON.stringify(MinDeaths));
    localStorage.setItem("MostAffected", JSON.stringify(MostAffected));
    localStorage.setItem("totalPopulation", JSON.stringify(totalPopulation));
    localStorage.setItem("totalDeaths", JSON.stringify(totalDeaths));
    localStorage.setItem("percentageTotalDeaths", JSON.stringify(percentageTotalDeaths));
  }
  getDataCovid():Array<any> | null {
    const userString = localStorage.getItem(this.localStorageKey);
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }
  getMaxDeaths():any | null {
    const userString = localStorage.getItem("MaxDeaths");
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }
  getMinDeaths():any | null {
    const userString = localStorage.getItem("MinDeaths");
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }
  getMostAffected():any | null {
    const userString = localStorage.getItem("MostAffected");
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }
  getTotalPopulation():number | null {
    const userString = localStorage.getItem("totalPopulation");
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }
  getTotalDeaths():number | null {
    const userString = localStorage.getItem("totalDeaths");
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }
  getPercentageTotalDeaths():number | null {
    const userString = localStorage.getItem("percentageTotalDeaths");
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }
}
