import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DashboardRoutingModule } from './dashboard.routes.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule
  ]
})
export class DashboardModule { }
