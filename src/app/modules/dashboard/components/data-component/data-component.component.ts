import { Component } from '@angular/core';
import { Estado } from 'src/app/modules/shared/models/estados.interface';
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

  Estados: any = Estado;
  contador = 0;
  estado = '';

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
            this.Estados.forEach((es: any) => {
              if (es.hasOwnProperty(state)) {
                es[`${state}`].muertes += item['4/26/21'];
                es[`${state}`].poblacion += item.Population;
              }
            });
          }
        });
      });
    
      console.log(this.Estados);
      console.log(this.ExcelData);
    };
  }
}
