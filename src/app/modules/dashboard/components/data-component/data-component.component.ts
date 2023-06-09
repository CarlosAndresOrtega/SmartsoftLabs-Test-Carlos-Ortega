import { Component } from '@angular/core';
import { States } from 'src/app/modules/shared/models/estados.interface';
import { stateNames } from 'src/app/modules/shared/models/estados.interface';
import { CheckDataService } from 'src/app/modules/shared/services/checkData/check-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-data-component',
  templateUrl: './data-component.component.html',
  styleUrls: ['./data-component.component.scss'],
})
export class DataComponentComponent {
  ExcelData: Array<any> = [];
  convertedJson!: string;

  States: any = States;

  totalPopulation = 0;
  totalDeaths = 0;
  percentageTotalDeaths = 0;

  MaxDeaths = {
    deaths: 0,
    nameState: '',
  };
  MinDeaths = {
    deaths: Infinity, // o puedes usar un número muy bajo como -Infinity
    nameState: '',
  };
  MostAffected = {
    percentage: 0,
    nameState: '',
  };

  constructor(private data: CheckDataService) {}

  ReadExel(event: any) {
    let file = event.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e: any) => {
      var workBook = XLSX.read(e.target.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);

      this.ExcelData.forEach((item) => {
        stateNames.forEach((state) => {
          if (item.Province_State == state) {
            this.States.forEach((es: any) => {
              if (es.hasOwnProperty(state)) {
                es[`${state}`].deaths += item['4/26/21'];
                es[`${state}`].population += item.Population;
              }
            });
          }
        });
      });

      stateNames.forEach((state) => {
        this.States.forEach((data: any) => {
          if (data.hasOwnProperty(state)) {
            this.totalPopulation += data[state].population;
            this.totalDeaths += data[state].deaths;
          }
        });
      });

      this.States.forEach((es: any) => {
        stateNames.forEach((state) => {
          if (es.hasOwnProperty(state)) {
            es[state].MortalityRate =
              (es[state].deaths / es[state].population) * 1000;
            es[state].percentagePopulation =
              (es[state].population / this.totalPopulation) * 100;
          }
        });
      });

      this.percentageTotalDeaths = (this.totalDeaths / this.totalPopulation) * 100;

      console.log('Porcentaje total de muertes:',this.percentageTotalDeaths);
      console.log(this.States);
      console.log(this.totalPopulation);
      console.log(this.ExcelData);

      this.identifyState();
    };
  }

  identifyState() {
    stateNames.forEach((state) => {
      this.States.forEach((data: any) => {
        if (data.hasOwnProperty(state)) {
          if (data[state].deaths > this.MaxDeaths.deaths) {
            this.MaxDeaths.deaths = data[state].deaths;
            this.MaxDeaths.nameState = state;
          }
          if (data[state].deaths < this.MinDeaths.deaths) {
            this.MinDeaths.deaths = data[state].deaths;
            this.MinDeaths.nameState = state;
          }
          if (data[state].percentage > this.MostAffected.percentage) {
            this.MostAffected.percentage = data[state].percentage;
            this.MostAffected.nameState = state;
          }
        }
      });
    });
    console.log(this.MaxDeaths);
    console.log(this.MinDeaths);
    console.log(this.MostAffected);
  }
}
