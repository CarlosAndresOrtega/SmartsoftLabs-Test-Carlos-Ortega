import { Injectable } from '@angular/core';
import {
  MaxDeaths,
  MinDeaths,
  MostAffected,
} from '../../models/data.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CheckDataService {
  localStorageKey = 'DataCovid';
  constructor() {}

  saveData(
    States: any,
    MaxDeaths: any,
    MinDeaths: any,
    MostAffected: any,
    totalPopulation: number,
    totalDeaths: number,
    percentageTotalDeaths: number,
    labels:Array<string>,
    percentageData:Array<number>
  ): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(States));
    localStorage.setItem('MaxDeaths', JSON.stringify(MaxDeaths));
    localStorage.setItem('MinDeaths', JSON.stringify(MinDeaths));
    localStorage.setItem('MostAffected', JSON.stringify(MostAffected));
    localStorage.setItem('totalPopulation', JSON.stringify(totalPopulation));
    localStorage.setItem('totalDeaths', JSON.stringify(totalDeaths));
    localStorage.setItem(
      'percentageTotalDeaths',
      JSON.stringify(percentageTotalDeaths)
    );
    localStorage.setItem('labels', JSON.stringify(labels));
    localStorage.setItem('percentageData', JSON.stringify(percentageData));
  }
  getDataCovid(): Array<any> {
    const userString = localStorage.getItem(this.localStorageKey);
    if (userString) {
      return JSON.parse(userString);
    }
    return [];
  }
  getMaxDeaths(): MaxDeaths {
    const userString = localStorage.getItem('MaxDeaths');
    if (userString) {
      return JSON.parse(userString);
    }
    return {
      deaths: 0,
      nameState: '',
      population:0
    };
  }
  getMinDeaths(): MinDeaths {
    const userString = localStorage.getItem('MinDeaths');
    if (userString) {
      return JSON.parse(userString);
    }
    return {
      deaths: 0,
      nameState: '',
      population:0
    };
  }
  getMostAffected(): MostAffected {
    const userString = localStorage.getItem('MostAffected');
    if (userString) {
      return JSON.parse(userString);
    }
    return {
      percentage: 0,
      nameState: '',
      population:0
    };
  }
  getTotalPopulation(): number {
    const userString = localStorage.getItem('totalPopulation');
    if (userString) {
      return JSON.parse(userString);
    }
    return 0;
  }
  getTotalDeaths(): number {
    const userString = localStorage.getItem('totalDeaths');
    if (userString) {
      return JSON.parse(userString);
    }
    return 0;
  }
  getPercentageTotalDeaths(): number {
    const userString = localStorage.getItem('percentageTotalDeaths');
    if (userString) {
      return JSON.parse(userString);
    }
    return 0;
  }
  getLabels(): Array<string> {
    const userString = localStorage.getItem('labels');
    if (userString) {
      return JSON.parse(userString);
    }
    return [];
  }
  getPercentageData(): Array<number> {
    const userString = localStorage.getItem('percentageData');
    if (userString) {
      return JSON.parse(userString);
    }
    return [];
  }
}
