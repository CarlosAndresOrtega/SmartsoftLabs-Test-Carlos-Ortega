import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core/core.module';
import { LoginModule } from './modules/login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PruebaComponent } from './components/prueba/prueba.component';
@NgModule({
  declarations: [
    AppComponent,
    PruebaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    LoginModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
