import { Component, Renderer2 } from '@angular/core';
import { States } from 'src/app/modules/shared/models/estados.interface';
import { stateNames } from 'src/app/modules/shared/models/estados.interface';
import { CheckDataService } from 'src/app/modules/shared/services/checkData/check-data.service';
import * as XLSX from 'xlsx';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-data-component',
  templateUrl: './data-component.component.html',
  styleUrls: ['./data-component.component.scss'],
})
export class DataComponentComponent {
  public chart: any;


  ExcelData: Array<any> = [];
  convertedJson!: string;

  States: any = States;

  totalPopulation = 0;
  totalDeaths = 0;
  percentageTotalDeaths = 0;

  MaxDeaths = {
    deaths: 0,
    nameState: '',
    population:0
  };
  MinDeaths = {
    deaths: Infinity,
    nameState: '',
    population:0
  };
  MostAffected = {
    percentage: 0,
    nameState: '',
    population:0
  };

  activeDrop = true;

  labels: Array<string> = [];
  percentageData: Array<number> = [];

  constructor(private saveSvc: CheckDataService, private renderer: Renderer2) {}

  ngOnInit() {
    let value = this.saveSvc.getDataCovid();
    if (Array.isArray(value) && value.length !== 0) {
      this.getData();
      this.activeDrop = false;
      this.createChart();
      this.updateChart();
    } else {
      this.activeDrop = true;
      this.createChart();
    }
  }
  updateChart() {
    this.chart.data['labels'] = this.labels;
    this.chart.data['datasets'][0].data = this.percentageData;
    this.chart.update();
  }
  createChart() {
    var ctx = this.renderer.selectRootElement('#MyChart').getContext('2d');
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'pie', 
      data: { 
        labels: [this.labels],
        datasets: [
          {
            label: 'Población total por estado',
            data: [this.percentageData],
            backgroundColor: [
              '#FEDCBA',
              '#B9CDEF',
              '#ABDEF0',
              '#75ADC9'
            ],
            hoverBorderColor:'#000',
            
          },
        ],
      },
      options: {
        plugins: {
          title: {
              display: true,
              text: 'Porcentaje total de muertes vs Población total por estado.',
          }
      }
      },
    });
  }
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

      let total = 0;

      this.States.forEach((es: any) => {
        stateNames.forEach((state) => {
          if (es.hasOwnProperty(state)) {
            es[state].MortalityRate =
              (es[state].deaths / es[state].population) * 1000;
            es[state].percentagePopulation = Math.round(
              (es[state].population / this.totalPopulation) * 360
            );

            total += es[state].percentagePopulation;
            this.chart.data['labels'].push(state);
            this.chart.data['datasets'][0].data.push(
              Math.round(es[state].percentagePopulation)
            );
            this.percentageData.push(
              Math.round(es[state].percentagePopulation)
            );
          }
        });
      });

      this.percentageTotalDeaths =
        (this.totalDeaths / this.totalPopulation) * 360;

      this.identifyState();
      this.chart.data['labels'].splice(0, 1);
      this.chart.data['labels'].unshift('PORCENTAJE TOTAL DE MUERTES');
      this.chart.data['datasets'][0].data.splice(0, 1);
      this.chart.data['datasets'][0].data.unshift(
        Math.round(this.percentageTotalDeaths)
      );
      this.percentageData.unshift(Math.round(this.percentageTotalDeaths));

      
      this.chart.update();
      this.activeDrop = false;
      this.saveSvc.saveData(
        this.States,
        this.MaxDeaths,
        this.MinDeaths,
        this.MostAffected,
        this.totalPopulation,
        this.totalDeaths,
        this.percentageTotalDeaths,
        this.chart.data['labels'],
        this.percentageData
      );
    };
  }

  identifyState(): void {
    stateNames.forEach((state) => {
      this.States.forEach((data: any) => {
        if (data.hasOwnProperty(state)) {
          if (data[state].deaths > this.MaxDeaths.deaths) {
            this.MaxDeaths = {
              deaths: data[state].deaths,
              nameState: state,
              population: data[state].population
            };
          }
          if (data[state].deaths < this.MinDeaths.deaths) {
            this.MinDeaths = {
              deaths: data[state].deaths,
              nameState: state,
              population: data[state].population
            };

          }
          if (data[state].MortalityRate > this.MostAffected.percentage) {
            this.MostAffected = {
              percentage: data[state].MortalityRate.toFixed(2),
              nameState: state,
              population: data[state].population
            };

          }
        }
      });
    });
  }

  getData(): void {
    this.States = this.saveSvc.getDataCovid();
    this.MaxDeaths = this.saveSvc.getMaxDeaths();
    this.MinDeaths = this.saveSvc.getMinDeaths();
    this.MostAffected = this.saveSvc.getMostAffected();
    this.totalPopulation = this.saveSvc.getTotalPopulation();
    this.totalDeaths = this.saveSvc.getTotalDeaths();
    this.percentageTotalDeaths = this.saveSvc.getPercentageTotalDeaths();
    this.labels = this.saveSvc.getLabels();
    this.percentageData = this.saveSvc.getPercentageData();
  }
}
