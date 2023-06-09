import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { checkLoginGuard } from './guards/check-login.guard';
import { CheckDataService } from './services/checkData/check-data.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[CheckDataService],
  exports:[]
})
export class SharedModule { }
