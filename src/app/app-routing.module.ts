import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PruebaComponent } from './components/prueba/prueba.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/Login',
    pathMatch:'full'
  },
  {
    path:'Login',
    loadChildren:()=> import('./modules/login/login.module').then((m)=>m.LoginModule)
  },
  {
    path:'dashboard',
    loadChildren:()=> import('./modules/dashboard/dashboard.module').then((m)=>m.DashboardModule)
    // component:PruebaComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
