import { Component } from '@angular/core';
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

  Estados: any = [];
  contador = 0;
  estado='';

  constructor(private data: CheckDataService) {}

  ReadExel(event: any) {
    let file = event.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e: any) => {
      var workBook = XLSX.read(e.target.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);

      for (let i = 0; i < this.ExcelData.length - 1; i++) {
        // console.log(i+' '+this.ExcelData[i]['4/26/21'])
        if (this.ExcelData[i].Province_State == undefined) {
          console.log('Entrando');
          this.contador += 0;
        } else if (
          this.ExcelData[i].Province_State ==
          this.ExcelData[i + 1].Province_State
        ) {
          this.contador+=parseInt(this.ExcelData[i]['4/26/21']) 
        }
      }
      // this.Estados.push(nuevoObjeto);
      // const nuevoObjeto = {
      //   [this.ExcelData[0].Province_State]:
      //     parseInt(this.ExcelData[0]['4/26/21']) +
      //     parseInt(this.ExcelData[0 + 1]['4/26/21']),
      // };

      console.log(this.contador);
      console.log(this.Estados);
      console.log(this.ExcelData.length);
    };
  }
}
