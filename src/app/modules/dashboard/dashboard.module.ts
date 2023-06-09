import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DashboardRoutingModule } from './dashboard.routes.module';
import { DataComponentComponent } from './components/data-component/data-component.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    DataComponentComponent
    
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class DashboardModule { }
