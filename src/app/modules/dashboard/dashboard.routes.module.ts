import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
// import { MycomponentComponent } from './components';
// import { CanActivateUrl } from '../core';

const routes: Routes = [
  {
    path:'',
    component:HeaderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
